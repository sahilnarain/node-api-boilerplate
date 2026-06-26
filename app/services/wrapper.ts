'use strict';

import status = require('app/configs/status');

import type {Status} from 'types/api';

/**
 * Wraps an async function so any thrown error is caught and converted into a
 * standard Status envelope (or forwarded to a trailing callback, e.g. Express
 * `next`).
 *
 * The wrapper preserves the original function's signature: on the happy path it
 * resolves with `R`; on error it resolves with a Status object cast to `R` so
 * call sites can keep assuming the success shape (matching the original
 * untyped behaviour).
 */
function wrap<Args extends unknown[], R>(inputFunction: (...args: Args) => Promise<R>): (...args: Args) => Promise<R> {
  return async function (this: unknown, ...args: Args): Promise<R> {
    try {
      return await inputFunction.apply(this, args);
    } catch (e) {
      let cb: ((value: Status) => unknown) | undefined;
      if (args.length !== 1) {
        const last = args[args.length - 1];
        if (typeof last === 'function') {
          cb = last as (value: Status) => unknown;
        }
      }

      const err = e as {message?: string};
      if (err && Object.prototype.hasOwnProperty.call(err, 'message') && err.message) {
        const statusObj = status.getStatus(err.message);
        console.log(new Date().toISOString(), statusObj);
        return (cb ? cb(statusObj) : statusObj) as unknown as R;
      } else {
        const statusObj = status.getStatus('generic_fail');
        return (cb ? cb(statusObj) : statusObj) as unknown as R;
      }
    }
  };
}

export = {
  wrap: wrap
};
