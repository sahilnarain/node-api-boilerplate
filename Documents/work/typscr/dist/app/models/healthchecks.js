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
const config_1 = __importDefault(require("app/configs/config"));
const utils_1 = __importDefault(require("app/services/utils"));
const wrapper_1 = __importDefault(require("app/services/wrapper"));
const check = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const checkQuery = config_1.default.knex.select(config_1.default.knex.raw('now()'));
    let result = yield checkQuery;
    return utils_1.default.sanitizeSqlResult(result[0]);
});
module.exports = {
    check: wrapper_1.default.wrap(check)
};
