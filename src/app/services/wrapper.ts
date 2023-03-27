'use strict';

import status from 'app/configs/status';

function wrap(inputFunction: any) {
  return async  () => {
    try {
      return await inputFunction.apply(globalThis, arguments);   //this
    } catch (e: any) {
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

export = {
  wrap: wrap
};
