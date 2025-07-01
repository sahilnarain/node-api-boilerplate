'use strict';

import {CreatePlaceholderParams, GetPlaceholdersParams, GetPlaceholderParams, UpdatePlaceholderParams, Placeholder} from 'types/index';

import utilsService from 'app/services/utils';

import config from 'app/configs/config';

const createPlaceholder = async (params: CreatePlaceholderParams): Promise<number> => {
  // if (!params.param1) {
  //   throw new Error('input_missing');
  // }

  let _insert = {
    param1: params.param1
  };

  let createPlaceholderQuery = config.knex.insert(_insert).into('placeholders');

  let result = await createPlaceholderQuery;

  return result[0].insertId;
};

const getPlaceholders = async (params: GetPlaceholdersParams): Promise<Placeholder[]> => {
  let getPlaceholdersQuery = config.knex.select('id').from('placeholders').orderBy('id', 'desc');

  params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;

  let result = await getPlaceholdersQuery;

  return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder = async (params: GetPlaceholderParams): Promise<Placeholder> => {
  // if (!params.placeholderId) {
  //   throw new Error('input_missing');
  // }
  //
  let placeholderParams: GetPlaceholdersParams = {
    placeholderId: params.placeholderId
  };

  let result: Placeholder[] = await getPlaceholders(placeholderParams);

  return result[0];
};

const updatePlaceholder = async (params: UpdatePlaceholderParams): Promise<boolean> => {
  // if (!params.placeholderId) {
  //   throw new Error('input_missing');
  // }

  let _update = {
    updated_at: new Date().toISOString(),
    ...(params.param1 ? {param1: params.param1} : {})
  };

  let updatePlaceholderQuery = config.knex('placeholders').update(_update).where('id', params.placeholderId);

  await updatePlaceholderQuery;

  return true;
};

export default {
  createPlaceholder: createPlaceholder,
  getPlaceholders: getPlaceholders,
  getPlaceholder: getPlaceholder,
  updatePlaceholder: updatePlaceholder
};
