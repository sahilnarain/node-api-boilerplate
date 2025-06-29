'use strict';

import utilsService from 'app/services/utils';

import config from 'app/configs/config';

const createPlaceholder = async (params) => {
  // if (!params.param1) {
  //   throw new Error('input_missing');
  // }
  //
  // let _insert = {
  //   param1: params.param1
  // };
  //
  // let createPlaceholderQuery = config.knex.insert(_insert).into('placeholders');
  //
  // let result = await createPlaceholderQuery;
  //
  // return result[0].insertId;
};

const getPlaceholders = async (params) => {
  // let getPlaceholdersQuery = config.knex.select('id').from('placeholders').orderBy('id', 'desc');
  //
  // params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;
  //
  // let result = await getPlaceholdersQuery;
  //
  // return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder = async (params) => {
  // if (!params.placeholderId) {
  //   throw new Error('input_missing');
  // }
  //
  // let placeholderParams = {};
  // placeholderParams.placeholderId = params.placeholderId;
  //
  // let result = await getPlaceholders(placeholderParams);
  // if (!result) {
  //   return null;
  // }
  //
  // return result[0];
};

const updatePlaceholder = async (params) => {
  // if (!params.placeholderId) {
  //   throw new Error('input_missing');
  // }
  //
  // let _update = {
  //   updated_at: new Date().toISOString()
  // };
  // params.param1 ? (_update.param1 = params.param1) : null;
  //
  // let updatePlaceholderQuery = config.knex('placeholders').update(_update).where('id', params.placeholderId);
  //
  // await updatePlaceholderQuery;
  //
  // return true;
};

export default {
  createPlaceholder: createPlaceholder,
  getPlaceholders: getPlaceholders,
  getPlaceholder: getPlaceholder,
  updatePlaceholder: updatePlaceholder
};
