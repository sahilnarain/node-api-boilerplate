import placeholderService from "app/services/placeholder";
import wrapperService from "app/services/wrapper";
import { Controller, CreatePlaceholderRequest, GetPlaceholdersRequest, GetplaceholderRequest, UpdatePlaceholderRequest, CreatePlaceholderResponse, GetPlaceholersResponse, GetplaceholderResponse, UpdatePlaceholderResponse, APIResponse } from 'types';


const createPlaceholder: Controller<CreatePlaceholderResponse> = async (req: CreatePlaceholderRequest, res) => {
  const param = req.body;
  if (!param.param1) {
    throw new Error('input_missing');
  }

  let result = await placeholderService.createPlaceholder(param);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholders: Controller<GetPlaceholersResponse> = async (req: GetPlaceholdersRequest, res) => {
  const param = req.body

  let result = await placeholderService.getPlaceholders({ placeholderId: param.placeholder_id });

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholder: Controller<GetplaceholderResponse> = async (req: GetplaceholderRequest, res) => {
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  let placeholderParams: any = {};
  placeholderParams.placeholderId = parseInt(req.params.placeholder_id);

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