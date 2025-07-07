import placeholderService from "app/services/placeholder";
import wrapperService from "app/services/wrapper";
import { Controller, CreatePlaceholderControllerBody, GetPlaceholersControllerBody, GetPlaceholderControllerBody, UpdatePlaceholderControllerBody } from 'types';


const createPlaceholder: Controller = async (req, res) => {
  const param = req.body as CreatePlaceholderControllerBody;
  if (!param.param1) {
    throw new Error('input_missing');
  }

  let result = await placeholderService.createPlaceholder(param);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholders: Controller = async (req, res) => {
  const param = req.body as GetPlaceholersControllerBody

  let result = await placeholderService.getPlaceholders(param);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholder: Controller = async (req, res) => {
  req.body as GetPlaceholderControllerBody;
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  let placeholderParams: any = {};
  placeholderParams.placeholderId = parseInt(req.params.placeholder_id);

  let result = await placeholderService.getPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const updatePlaceholder: Controller = async (req, res) => {
  req.body as UpdatePlaceholderControllerBody;
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