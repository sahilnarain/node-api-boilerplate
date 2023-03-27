'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const status_1 = __importDefault(require("app/configs/status"));
function wrap(inputFunction) {
    return () => __awaiter(this, arguments, void 0, function* () {
        try {
            return yield inputFunction.apply(globalThis, arguments); //this
        }
        catch (e) {
            let cb;
            if (arguments.length !== 1) {
                cb = arguments[arguments.length - 1];
            }
            // console.log(e.message);
            if (e.hasOwnProperty('message')) {
                console.log(new Date().toISOString(), status_1.default.getStatus(e.message));
                return cb ? cb(status_1.default.getStatus(e.message)) : status_1.default.getStatus(e.message);
            }
            else {
                return cb ? cb(status_1.default.getStatus('generic_fail')) : status_1.default.getStatus('generic_fail');
            }
        }
    });
}
module.exports = {
    wrap: wrap
};
