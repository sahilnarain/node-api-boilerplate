'use strict';

const status = require('app/configs/status');

function wrap(inputFunction) {
  return async function () {
    try {
      return await inputFunction.apply(this, arguments);
    } catch (e) {
      let cb;
      if (arguments.length !== 1) {
        cb = arguments[arguments.length - 1];
      }

      // console.log(e.message);
      if (e.hasOwnProperty('message')) {
        console.log(new Date().toISOString(), status.getStatus(e.message));
        return cb ? cb(status.getStatus(e.message)) : status.getStatus(e.message);
      } else {
        return cb ? cb(status.getStatus('generic_fail')) : status.getStatus('generic_fail');
      }
    }
  };
}

module.exports = {
  wrap: wrap
};
