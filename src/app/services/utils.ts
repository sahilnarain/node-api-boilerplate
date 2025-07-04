'use strict';

import https from 'https'
import config from "app/configs/config";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | JSONValue[] // Need to move this globally


const sanitizeSqlResult = <T>(result: T): JSONValue => {
  return JSON.parse(JSON.stringify(result));
};

const addDays = (date: Date, numberOfDays: number) => {
  return new Date(date.setDate(date.getDate() + numberOfDays));
};

const createHierarchy = (input: [any]) => {
  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i].parent_id) {
      let _index = input.indexOf(input.filter((inp) => inp.id === input[i].parent_id)[0]);

      if (!input[_index].hasOwnProperty('children')) {
        input[_index].children = [];
      }

      input[_index].children.push(input[i]);
      input.splice(i, 1);
    }
  }

  return input;
};

const sortByDesc = <T>(key: keyof T) => {
  return (array1: T, array2: T) => (array1[key] < array2[key] ? 1 : array2[key] < array1[key] ? -1 : 0);
};

const prepareFetchOptions = (options: any) => {
  if (options.method.toUpperCase() === 'GET') {
    delete options.body;
    options.qs && Object.keys(options.qs).length ? (options.url += '?' + new URLSearchParams(options.qs)) : null;
  }

  options.json ? delete options.json : null;
  options.headers ? (options.headers['Content-Type'] = 'application/json') : null;
  options.body ? (options.body = JSON.stringify(options.body)) : null;

  config.IPV6 ? (options.agent = new https.Agent({ family: 6 })) : null;

  return options;
};

export default {
  sanitizeSqlResult: sanitizeSqlResult,
  addDays: addDays,
  createHierarchy: createHierarchy,
  sortByDesc: sortByDesc,
  prepareFetchOptions: prepareFetchOptions
}