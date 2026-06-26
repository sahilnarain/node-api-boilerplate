'use strict';

import type {Request, Response, NextFunction} from 'express';

import placeholderService = require('app/services/placeholder');
import wrapperService = require('app/services/wrapper');

/** Parameters passed from the controller layer down into the service. */
interface PlaceholderParams {
  placeholderId?: number;
  param1?: string;
}

// eslint-disable-next-line no-unused-vars
const createPlaceholder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const body = req.body as {param1?: string};
  if (!body.param1) {
    throw new Error('input_missing');
  }

  const placeholderParams: PlaceholderParams = {};
  placeholderParams.param1 = body.param1;

  const result = await placeholderService.createPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholders = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const placeholderParams: PlaceholderParams = {};

  const result = await placeholderService.getPlaceholders(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const getPlaceholder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  const placeholderParams: PlaceholderParams = {};
  placeholderParams.placeholderId = parseInt(req.params.placeholder_id as string);

  const result = await placeholderService.getPlaceholder(placeholderParams);

  return res.json(result);
};

// eslint-disable-next-line no-unused-vars
const updatePlaceholder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.params.placeholder_id) {
    throw new Error('input_missing');
  }

  const body = req.body as {param1?: string};
  const placeholderParams: PlaceholderParams = {};
  placeholderParams.placeholderId = parseInt(req.params.placeholder_id as string);
  body.param1 ? (placeholderParams.param1 = body.param1) : null;

  const result = await placeholderService.updatePlaceholder(placeholderParams);

  return res.json(result);
};

export = {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
};
