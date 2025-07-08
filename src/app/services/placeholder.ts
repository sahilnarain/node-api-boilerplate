import status from 'app/configs/status';
import wrapperService from 'app/services/wrapper';
import placeholderModel from 'app/models/placeholder';
import {CreatePlaceholderOperation, GetPlaceholdersOperation, GetPlaceholderOperation, UpdatePlaceholderOperation, APIResponse, CreatePlaceholderResponse } from 'types';

const createPlaceholder = async (params: CreatePlaceholderOperation): Promise<APIResponse<CreatePlaceholderResponse>> => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let placeholderId = await placeholderModel.createPlaceholder(params);

  let result = await placeholderModel.getPlaceholder({ placeholderId });
  if (!result) {
    throw new Error
  }

  let response = status.getStatus('success') as APIResponse<CreatePlaceholderResponse>;
  response.data = {
    placeholder: result
  }
  return response;
};

const getPlaceholders = async (params: GetPlaceholdersOperation): Promise<APIResponse> => {
  let placeholderParams: GetPlaceholdersOperation = {};
  params.placeholderId ? (placeholderParams.placeholderId = params.placeholderId) : null;

  let result = await placeholderModel.getPlaceholders(placeholderParams);

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholders = result;

  return response;
};

const getPlaceholder = async (params: GetPlaceholderOperation): Promise<APIResponse> => {
  if (!params.placeholderId) {
    throw new Error('input_missing');
  }

  let placeholderParams: any = {};
  placeholderParams.placeholderId = params.placeholderId;

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const updatePlaceholder = async (params: UpdatePlaceholderOperation): Promise<APIResponse> => {
  if (!params.placeholderId || !params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams: any = {};
  placeholderParams.placeholderId = params.placeholderId;
  placeholderParams.param1 = params.param1;

  await placeholderModel.updatePlaceholder(placeholderParams);

  placeholderParams = {};
  placeholderParams.param1 = params.param1;

  let result = await placeholderModel.getPlaceholder(placeholderParams);

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholder = result;

  return response;
};

export default {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
}