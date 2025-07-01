'use strict';

import {CreatePlaceholderParams, CreatePlaceholderApiResponse, GetPlaceholdersParams, GetPlaceholdersApiResponse, GetPlaceholderParams, GetPlaceholderApiResponse, UpdatePlaceholderParams, UpdatePlaceholderApiResponse} from 'types/index';

import placeholderService from 'app/services/placeholder';

// eslint-disable-next-line no-unused-vars
const createPlaceholder = async (req, res, next): Promise<CreatePlaceholderApiResponse> => {
  // if (!req.body.param1) {
  //   throw new Error('input_missing');
  // }
  //
  let placeholderParams: CreatePlaceholderParams = {
    param1: req.body.param1
  };

  let result = await placeholderService.createPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholders = async (req, res, next): Promise<GetPlaceholdersApiResponse> => {
  let placeholderParams: GetPlaceholdersParams = {};

  let result = await placeholderService.getPlaceholders(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholder = async (req, res, next): Promise<GetPlaceholderApiResponse> => {
  // if (!req.params.placeholder_id) {
  //   throw new Error('input_missing');
  // }

  let placeholderParams: GetPlaceholderParams = {
    placeholderId: parseInt(req.body.placeholder_id)
  };

  let result = await placeholderService.getPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const updatePlaceholder = async (req, res, next): Promise<UpdatePlaceholderApiResponse> => {
  // if (!req.params.placeholder_id) {
  //   throw new Error('input_missing');
  // }

  let placeholderParams: UpdatePlaceholderParams = {
    placeholderId: parseInt(req.params.placeholder_id)
  };
  req.body.param1 ? (placeholderParams.param1 = req.body.param1) : null;

  let result = await placeholderService.updatePlaceholder(placeholderParams);

  return res.json(result);
};

export default {
  createPlaceholder: createPlaceholder,
  getPlaceholders: getPlaceholders,
  getPlaceholder: getPlaceholder,
  updatePlaceholder: updatePlaceholder
};
