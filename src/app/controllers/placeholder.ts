import placeholderService from "app/services/placeholder";
import wrapperService from "app/services/wrapper";
import { Controller, CreatePlaceholderRequest, GetPlaceholdersRequest, GetPlaceholderRequest, UpdatePlaceholderRequest, CreatePlaceholderResponse, GetPlaceholersResponse, GetPlaceholderResponse, UpdatePlaceholderResponse, APIResponse } from 'types';


const createPlaceholder: Controller<CreatePlaceholderResponse> = async (req: CreatePlaceholderRequest, res) => {
  const params = req.body;
  if (!params.param1) {
    throw new Error('input_missing');
  }

  let placeholderParams = {
    param1: params.param1
  }

  let result = await placeholderService.createPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholders: Controller<GetPlaceholersResponse> = async (req: GetPlaceholdersRequest, res) => {
  const params = req.body

  let placeholderParams = {
    placeholderId: params.placeholder_id
  }


  let result = await placeholderService.getPlaceholders(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholder: Controller<GetPlaceholderResponse> = async (req: GetPlaceholderRequest, res) => {
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  let placeholderParams = {
    placeholderId: req.params.placeholder_id
  };

  let result = await placeholderService.getPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const updatePlaceholder: Controller<UpdatePlaceholderResponse> = async (req: UpdatePlaceholderRequest, res) => {
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  let placeholderParams: any = {};
  placeholderParams.placeholderId = parseInt(req.params.placeholder_id);
  req.body.param1 ? (placeholderParams.param1 = req.body.param1) : null;

  let result = await placeholderService.updatePlaceholder(placeholderParams);

  return res.json(result);
};

export default {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
}