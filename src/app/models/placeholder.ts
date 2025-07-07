import config from "app/configs/config";
import utilsService from "app/services/utils";
import wrapperService from "app/services/wrapper";
import type { CreatePlaceholderModelInput, GetPlaceholdersModelInput, GetPlaceholerModelInput, UpdatePlaceholderModelInput, Placeholder } from 'types';


const createPlaceholder = async (params: CreatePlaceholderModelInput): Promise<number> => {
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

const getPlaceholders = async (params: GetPlaceholdersModelInput): Promise<Placeholder[]> => {
  let getPlaceholdersQuery = config.knex.select('id').select('param1').select('active').select('created_at').select('updated_at').select('deleted_at').from('placeholders').orderBy('id', 'desc');

  params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;

  let result: Placeholder[] = await getPlaceholdersQuery;

  return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder = async (params: GetPlaceholerModelInput): Promise<Placeholder | null> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  let result = await getPlaceholders(params);
  if (!result) {
    return null;
  }

  return result[0];
};

const updatePlaceholder = async (params: UpdatePlaceholderModelInput): Promise<boolean> => {
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
