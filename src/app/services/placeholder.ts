import status from 'app/configs/status';
import wrapperService from 'app/services/wrapper';
import placeholderModel from 'app/models/placeholder';
import { APIResponse } from 'types';

export type CreatePlaceholderParams = {
  param1: string,
  placeholderId?: string
}

export type GetPlaceholdersParams = {
  param1?: string
}

export type GetPlaceholderParams = Partial<Omit<CreatePlaceholderParams, 'param1'>>

export type UpdatePlaceholderParams = CreatePlaceholderParams

export type CreatePlaceholderFn = (params: CreatePlaceholderParams) => Promise<APIResponse>
export type GetPlaceholdersFn = (params: GetPlaceholdersParams) => Promise<APIResponse>
export type GetPlaceholderFn = (params: GetPlaceholderParams) => Promise<APIResponse>
export type UpdatePlaceholderFn = (params: UpdatePlaceholderParams) => Promise<APIResponse>

const createPlaceholder: CreatePlaceholderFn = async (params) => {
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

const getPlaceholders: GetPlaceholdersFn = async (params) => {
  let placeholderParams: any = {};
  params.param1 ? (placeholderParams.param1 = params.param1) : null;

  let result = await placeholderModel.getPlaceholders(placeholderParams);

  let response = status.getStatus('success') as APIResponse;
  response.data = {};
  response.data.placeholders = result;

  return response;
};

const getPlaceholder: GetPlaceholderFn = async (params) => {
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

const updatePlaceholder: UpdatePlaceholderFn = async (params) => {
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