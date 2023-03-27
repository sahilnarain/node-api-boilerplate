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
const healthchecks_1 = __importDefault(require("app/services/healthchecks"));
const wrapper_1 = __importDefault(require("app/services/wrapper"));
const healthchecks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let myObj: {[key: string]: number} = {};
    // let myObj: Record<string, number> = {};
    // let healthchecksParams: Record<string, number> = {};
    // let healthchecksParams: {[key: string]: any} = {};
    let healthchecksParams;
    let result = yield healthchecks_1.default.healthchecks(); // missing healthchecksParams
    return res.json(result);
});
module.exports = {
    healthchecks: wrapper_1.default.wrap(healthchecks)
};
