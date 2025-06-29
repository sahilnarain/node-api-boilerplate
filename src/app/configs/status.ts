'use strict';

import {Status} from 'types/index';

const getStatus = (code): Status => {
  let status: Status = {
    code: code,
    error: true,
    message: ''
  };

  switch (code) {
    case 'success':
      status.error = false;
      status.message = 'Successful';
      break;

    case 'url_missing':
      status.message = 'URL not found';
      break;

    case 'input_missing':
      status.message = 'Mandatory inputs missing';
      break;

    case 'generic_fail':
    default:
      status.message = 'Generic failure: Something went wrong.';
      break;
  }

  return status;
};

export default {
  getStatus: getStatus
};
