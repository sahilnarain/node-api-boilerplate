'use strict';

import {
  CreatePlaceholderParams,
  CreatePlaceholderServiceResponse,
  GetPlaceholdersParams,
  GetPlaceholdersServiceResponse,
  GetPlaceholderParams,
  GetPlaceholderServiceResponse,
  UpdatePlaceholderParams,
  UpdatePlaceholderServiceResponse
} from 'types/index';

import status from 'app/configs/status';

import placeholderModel from 'app/models/placeholder';

const createPlaceholder = async (params: CreatePlaceholderParams): Promise<CreatePlaceholderServiceResponse> => {
  // if (!params.param1) {
  //   throw new Error('input_missing');
  // }

  let placeholderParams: CreatePlaceholderParams = {
    param1: params.param1
  };

  let placeholderId = await placeholderModel.createPlaceholder(placeholderParams);

  let _placeholderParams: GetPlaceholderParams = {
    placeholderId: placeholderId
  };

  let result = await placeholderModel.getPlaceholder(_placeholderParams);

  let response = {
    ...status.getStatus('success'),
    data: {
      placeholder: result
    }
  };

  return response;
};

const getPlaceholders = async (params: GetPlaceholdersParams): Promise<GetPlaceholdersServiceResponse> => {
  let placeholderParams: GetPlaceholdersParams = {};
  params.placeholderId ? (placeholderParams.placeholderId = params.placeholderId) : null;

  let result = await placeholderModel.getPlaceholders(placeholderParams);

  let response = {
    ...status.getStatus('success'),
    data: {
      placeholders: result
    }
  };

  return response;
};

const getPlaceholder = async (params: GetPlaceholderParams): Promise<GetPlaceholderServiceResponse> => {
  // if (!params.placeholderId) {
  //   throw new Error('input_missing');
  // }

  let placeholderParams: GetPlaceholderParams = {
    placeholderId: params.placeholderId
  };

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = {
    ...status.getStatus('success'),
    data: {
      placeholder: result
    }
  };

  return response;
};

const updatePlaceholder = async (params: UpdatePlaceholderParams): Promise<UpdatePlaceholderServiceResponse> => {
  // if (!params.placeholderId || !params.param1) {
  //   throw new Error('input_missing');
  // }

  let placeholderParams: UpdatePlaceholderParams = {
    placeholderId: params.placeholderId,
    param1: params.param1
  };

  await placeholderModel.updatePlaceholder(placeholderParams);

  let _placeholderParams: GetPlaceholderParams = {
    placeholderId: params.placeholderId
  };

  let result = await placeholderModel.getPlaceholder(_placeholderParams);

  let response = {
    ...status.getStatus('success'),
    data: {
      placeholder: result
    }
  };

  return response;
};

export default {
  createPlaceholder: createPlaceholder,
  getPlaceholders: getPlaceholders,
  getPlaceholder: getPlaceholder,
  updatePlaceholder: updatePlaceholder
};
