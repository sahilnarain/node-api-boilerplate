'use strict';

import status = require('app/configs/status');

import wrapperService = require('app/services/wrapper');

import placeholderModel = require('app/models/placeholder');

import type {Status} from 'types/api';

/** Parameters accepted by the placeholder service functions. */
interface PlaceholderParams {
  placeholderId?: number;
  param1?: string;
}

const createPlaceholder = async (params: PlaceholderParams): Promise<Status> => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams: PlaceholderParams = {};
  placeholderParams.param1 = params.param1;

  const placeholderId = await placeholderModel.createPlaceholder(placeholderParams);

  placeholderParams = {};
  placeholderParams.placeholderId = placeholderId;

  const result = await placeholderModel.getPlaceholder(placeholderParams);

  const response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const getPlaceholders = async (params: PlaceholderParams): Promise<Status> => {
  const placeholderParams: PlaceholderParams = {};
  params.param1 ? (placeholderParams.param1 = params.param1) : null;

  const result = await placeholderModel.getPlaceholders(placeholderParams);

  const response = status.getStatus('success');
  response.data = {};
  response.data.placeholders = result;

  return response;
};

const getPlaceholder = async (params: PlaceholderParams): Promise<Status> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  const placeholderParams: PlaceholderParams = {};
  placeholderParams.placeholderId = params.placeholderId;

  const result = await placeholderModel.getPlaceholder(placeholderParams);

  const response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const updatePlaceholder = async (params: PlaceholderParams): Promise<Status> => {
  if (!params.placeholderId || !params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams: PlaceholderParams = {};
  placeholderParams.placeholderId = params.placeholderId;
  placeholderParams.param1 = params.param1;

  await placeholderModel.updatePlaceholder(placeholderParams);

  placeholderParams = {};
  placeholderParams.param1 = params.param1;

  const result = await placeholderModel.getPlaceholder(placeholderParams);

  const response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

export = {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
};
