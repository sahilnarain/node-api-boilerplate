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
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("app/configs/config"));
const status_1 = __importDefault(require("app/configs/status"));
const wrapper_1 = __importDefault(require("app/services/wrapper"));
const healthchecks_1 = __importDefault(require("app/models/healthchecks"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'test') {
        return;
    }
    let selfOptions = {
        url: config_1.default.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
        method: 'GET'
    };
    let healthcheckOptions = {
        url: config_1.default.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
        method: 'GET'
    };
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        try {
            response = yield (yield (0, node_fetch_1.default)(selfOptions.url, selfOptions)).json();
        }
        catch (e) {
            return;
        }
        if (response && response.code && response.code === 'success') {
            yield (yield (0, node_fetch_1.default)(healthcheckOptions.url, healthcheckOptions)).json();
        }
    }), 30000);
});
const healthchecks = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // let healthchecksParams: {[key: string]: any} = ({}:);
    let healthchecksParams;
    let result = yield healthchecks_1.default.check(); // missing healthchecksParams
    if (!result) {
        throw new Error('generic_fail');
    }
    let response = status_1.default.getStatus('success');
    return response;
});
module.exports = {
    init: wrapper_1.default.wrap(init),
    healthchecks: wrapper_1.default.wrap(healthchecks)
};
