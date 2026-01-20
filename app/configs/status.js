'use strict';

const getStatus = (code) => {
  let status = {
    code: code,
    error: true,
    message: null
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

module.exports = {
  getStatus: getStatus
};
