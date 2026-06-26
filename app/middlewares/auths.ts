'use strict';

import type {Request, Response, NextFunction} from 'express';

const middleware = (req: Request, res: Response, next: NextFunction) => {
  return next();
};

export = middleware;
