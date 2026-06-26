'use strict';

import type {FetchOptions} from 'types/api';

/** A node in a parent/child hierarchy, used by createHierarchy. */
interface HierarchyNode {
  id: number | string;
  parent_id?: number | string | null;
  children?: HierarchyNode[];
  [key: string]: unknown;
}

const sanitizeSqlResult = <T>(result: T): T => {
  return JSON.parse(JSON.stringify(result)) as T;
};

const addDays = (date: Date, numberOfDays: number): Date => {
  return new Date(date.setDate(date.getDate() + numberOfDays));
};

const createHierarchy = (input: HierarchyNode[]): HierarchyNode[] => {
  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i].parent_id) {
      const _index = input.indexOf(input.filter((inp) => inp.id === input[i].parent_id)[0]);

      if (!Object.prototype.hasOwnProperty.call(input[_index], 'children')) {
        input[_index].children = [];
      }

      input[_index].children!.push(input[i]);
      input.splice(i, 1);
    }
  }

  return input;
};

const sortByDesc = <K extends PropertyKey>(key: K) => {
  return <T extends Record<K, number | string>>(array1: T, array2: T): number => ((array1[key] as number) < (array2[key] as number) ? 1 : (array2[key] as number) < (array1[key] as number) ? -1 : 0);
};

const prepareFetchOptions = async (options: FetchOptions): Promise<FetchOptions> => {
  if (options.method.toUpperCase() === 'GET') {
    delete options.body;
    options.qs && Object.keys(options.qs).length ? (options.url += '?' + new URLSearchParams(options.qs)) : null;
  }

  options.json ? delete options.json : null;
  options.headers ? (options.headers['Content-Type'] = 'application/json') : null;
  options.body ? (options.body = JSON.stringify(options.body)) : null;

  return options;
};

export = {
  sanitizeSqlResult: sanitizeSqlResult,
  addDays: addDays,
  createHierarchy: createHierarchy,
  sortByDesc: sortByDesc,
  prepareFetchOptions: prepareFetchOptions
};
