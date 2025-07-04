import { Middleware } from 'types';

const middleware: Middleware = (req, res, next) => {
  return next();
};

export default middleware
