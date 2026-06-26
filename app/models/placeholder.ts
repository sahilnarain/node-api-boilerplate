'use strict';

import utilsService = require('app/services/utils');
import wrapperService = require('app/services/wrapper');

import config = require('app/configs/config');

/** Parameters accepted by the placeholder model functions. */
interface PlaceholderParams {
  placeholderId?: number;
  param1?: string;
}

/** A placeholder row as stored in the `placeholders` table. */
interface Placeholder {
  id: number;
  param1?: string;
  created_at?: string;
  updated_at?: string;
}

const createPlaceholder = async (params: PlaceholderParams): Promise<number> => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  const _insert = {
    param1: params.param1
  };

  const createPlaceholderQuery = config.knex.insert(_insert).into('placeholders');

  const result = (await createPlaceholderQuery) as number[];

  return result[0];
};

const getPlaceholders = async (params: PlaceholderParams): Promise<Placeholder[]> => {
  const getPlaceholdersQuery = config.knex.select('id').from('placeholders').orderBy('id', 'desc');

  params.placeholderId ? getPlaceholdersQuery.where('id', params.placeholderId) : null;

  const result = (await getPlaceholdersQuery) as Placeholder[];

  return utilsService.sanitizeSqlResult(result);
};

const getPlaceholder = async (params: PlaceholderParams): Promise<Placeholder | null> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  const placeholderParams: PlaceholderParams = {};
  placeholderParams.placeholderId = params.placeholderId;

  const result = await getPlaceholders(placeholderParams);
  if (!result) {
    return null;
  }

  return result[0];
};

const updatePlaceholder = async (params: PlaceholderParams): Promise<boolean> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  const _update: {updated_at: string; param1?: string} = {
    updated_at: new Date().toISOString()
  };
  params.param1 ? (_update.param1 = params.param1) : null;

  const updatePlaceholderQuery = config.knex('placeholders').update(_update).where('id', params.placeholderId);

  await updatePlaceholderQuery;

  return true;
};

export = {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
};
