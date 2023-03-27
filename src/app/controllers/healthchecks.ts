'use strict';

import { Request, Response, NextFunction } from "express";

import healthchecksService from 'app/services/healthchecks';
import wrapperService from 'app/services/wrapper';

const healthchecks = async (req: Request, res: Response, next: NextFunction) => {
  // let myObj: {[key: string]: number} = {};
  // let myObj: Record<string, number> = {};
  // let healthchecksParams: Record<string, number> = {};
  // let healthchecksParams: {[key: string]: any} = {};
  let healthchecksParams: any;

  let result = await healthchecksService.healthchecks();  // missing healthchecksParams

  return res.json(result);
};

export = {
  healthchecks: wrapperService.wrap(healthchecks)
};
