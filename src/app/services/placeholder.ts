import status from 'app/configs/status';
import wrapperService from 'app/services/wrapper';
import placeholderModel from 'app/models/placeholder';
import { APIResponse } from 'types';

export type CreatePlaceholderInput = {
  param1: string
}

export type GetPlaceholdersInput = {
  param1?: string
}

export type GetPlaceholderInput = {
  placeholderId: number
}

export type UpdatePlaceholderInput = {
  placeholderId: number
  param1: string
}

const createPlaceholder = async (params: CreatePlaceholderInput): Promise<APIResponse> => {
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let placeholderId = await placeholderModel.createPlaceholder(params);

  let result = await placeholderModel.getPlaceholder({placeholderId});

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholder = result;

  return response;
};

const getPlaceholders = async (params: GetPlaceholdersInput): Promise<APIResponse> => {
  let placeholderParams: any = {};
  params.param1 ? (placeholderParams.param1 = params.param1) : null;

  let result = await placeholderModel.getPlaceholders(placeholderParams);

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholders = result;

  return response;
};

const getPlaceholder = async (params: GetPlaceholderInput): Promise<APIResponse> => {
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

const updatePlaceholder = async (params: UpdatePlaceholderInput): Promise<APIResponse> => {
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