'use strict';

const status = require('app/configs/status');

const wrapperService = require('app/services/wrapper');

const placeholderModel = require('app/models/placeholder');

const createPlaceholder = async (params) => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams = {};
  placeholderParams.param1 = params.param1;

  let placeholderId = await placeholderModel.createPlaceholder(placeholderParams);

  placeholderParams = {};
  placeholderParams.placeholderId = placeholderId;

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const getPlaceholders = async (params) => {
  let placeholderParams = {};
  params.param1 ? (placeholderParams.param1 = params.param1) : null;

  let result = await placeholderModel.getPlaceholders(placeholderParams);

  let response = status.getStatus('success');
  response.data = {};
  response.data.placeholders = result;

  return response;
};

const getPlaceholder = async (params) => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  let placeholderParams = {};
  placeholderParams.placeholderId = params.placeholderId;

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const updatePlaceholder = async (params) => {
  if (!params.placeholderId || !params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams = {};
  placeholderParams.placeholderId = params.placeholderId;
  placeholderParams.param1 = params.param1;

  await placeholderModel.updatePlaceholder(placeholderParams);

  placeholderParams = {};
  placeholderParams.param1 = params.param1;

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = status.getStatus('success');
  response.data = {};
  response.data.placeholder = result;

  return response;
};

module.exports = {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
};
