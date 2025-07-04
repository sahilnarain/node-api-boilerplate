import type { Status } from 'app/configs/types';

export const getStatus = (code: string): Status => {
  let status = null as Status | null;

  switch (code) {
    case 'success':
      status = {
        code: code,
        error: false,
        message: 'Successful'
      };
      break;

    case 'url_missing':
      status = {
        code: code,
        error: true,
        message: 'URL not found'
      };
      break;

    case 'input_missing':
      status = {
        code: code,
        error: true,
        message: 'Mandatory inputs missing'
      };
      break;

    case 'generic_fail':
    default:
      status = {
        code: 'generic_fail',
        error: true,
        message: 'Generic failure: Something went wrong.'
      };
      break;
  }

  return status;
};

export default {
  getStatus
}