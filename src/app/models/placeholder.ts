import config from "app/configs/config";
import utilsService from "app/services/utils";
import wrapperService from "app/services/wrapper";
import type { JSONValue } from 'types';

export type CreatePlaceHolderParam = {
  param1: string
}

export type GetPlaceholdersParams = {
  placeholderId?: number
}

export type GetPlaceholderParams = Partial<Omit<GetPlaceholdersParams, 'placeholderId'>> & {
  placeholderId: number
}

export type UpdatePlaceholderParams = GetPlaceholderParams & {
  param1: string
}

export type CreatePlaceHolderFn = (params: CreatePlaceHolderParam) => Promise<number>
export type GetPlaceholdersFn = (params: GetPlaceholdersParams) => Promise<JSONValue>
export type GetPlaceholderFn = (params: GetPlaceholderParams) => Promise<null | JSONValue>
export type UpdatePlaceholderFn = (params: UpdatePlaceholderParams) => Promise<boolean>


const createPlaceholder: CreatePlaceHolderFn = async (params) => {
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

const getPlaceholders: GetPlaceholdersFn = async (params) => {
  let getPlaceholdersQuery = config.knex.select('id').from('placeholders').orderBy('id', 'desc');

  params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;

  let result = await getPlaceholdersQuery;

  return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder: GetPlaceholderFn = async (params) => {
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

const updatePlaceholder: UpdatePlaceholderFn = async (params) => {
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
