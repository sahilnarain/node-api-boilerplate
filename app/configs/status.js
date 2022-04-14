'use strict';

const getStatus = (code) => {
  let status = null;

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

module.exports = {
  getStatus: getStatus
};
