import config from "app/configs/config";
import utilsService from "app/services/utils";
import wrapperService from "app/services/wrapper";
import type { JSONValue } from 'types';

export type CreatePlaceholderInput = {
  param1: string
}

export type GetPlaceholdersInput = {
  placeholderId?: number
}

export type GetPlaceholerInput = {
  placeholderId: number
}

export type UpdatePlaceholderInput = {
  param1: string
  placeholderId: number
}

const createPlaceholder = async (params: CreatePlaceholderInput): Promise<number> => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let _insert = {
    param1: params.param1
  };

  let createPlaceholderQuery = config.knex.insert(_insert).into('placeholders');

  let result = await createPlaceholderQuery;

  return result[0];
};

const getPlaceholders = async (params: GetPlaceholdersInput): Promise<JSONValue> => {
  let getPlaceholdersQuery = config.knex.select('id').from('placeholders').orderBy('id', 'desc');

  params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;

  let result = await getPlaceholdersQuery;

  return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder = async (params: GetPlaceholdersInput): Promise<JSONValue> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  let result = await getPlaceholders(params);
  if (!result) {
    return null;
  }

  // @ts-ignore
  return result[0];
};

const updatePlaceholder = async (params: UpdatePlaceholderInput): Promise<JSONValue> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  let _update: any = {
    updated_at: new Date().toISOString()
  };

  params.param1 ? (_update.param1 = params.param1) : null;

  let updatePlaceholderQuery = config.knex('placeholders').update(_update).where('id', params.placeholderId);

  await updatePlaceholderQuery;

  return true;
};

export default {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
}
