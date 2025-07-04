import status from 'app/configs/status';

type wrappedFunction<T extends (...args: any[]) => any> = T & {
  lastArgs?: Parameters<T>;
};

function wrap<T extends (...args: any[]) => any>(fn: T): wrappedFunction<T> {
  return async function (...args: Parameters<T>) {
    try {
      return await fn(...args)
    } catch (e: any) {
      let cb
      if (args.length !== 1) {
        cb = args[args.length - 1];
      }
      if (`${process.env.NODE_ENV}` !== 'production') {
        console.log(e)
      }
      if (e.hasOwnProperty('message')) {
        console.log(new Date().toISOString(), status.getStatus(e.message));
        return cb ? cb(status.getStatus(e.message)) : status.getStatus(e.message);
      } else {
        return cb ? cb(status.getStatus('generic_fail')) : status.getStatus('generic_fail');
      }
    }
  } as wrappedFunction<T>
}

export default {
  wrap: wrap
}