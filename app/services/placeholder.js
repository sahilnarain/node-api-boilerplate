'use strict';

const wrapperService = require('app/services/wrapper');

const placeholderModel = require('app/models/placeholder');

const createPlaceholder = async (params) => {
  return placeholderModel.createPlaceholder(params);
};

const getPlaceholders = async (params) => {
  return placeholderModel.getPlaceholders(params);
};

const getPlaceholder = async (params) => {
  return placeholderModel.getPlaceholder(params);
};

const updatePlaceholder = async (params) => {
  return placeholderModel.updatePlaceholder(params);
};

module.exports = {
  createPlaceholder: wrapperService.wrap(createPlaceholder),
  getPlaceholders: wrapperService.wrap(getPlaceholders),
  getPlaceholder: wrapperService.wrap(getPlaceholder),
  updatePlaceholder: wrapperService.wrap(updatePlaceholder)
};
