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
Object.defineProperty(exports, "__esModule", { value: true });
// Include core libraries
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const __dir = __dirname.slice(0, 33);
fs_1.default.existsSync(`${__dirname}/node_modules/app`) ? fs_1.default.symlinkSync(`${__dirname}/app`, `${__dir}/node_modules/app`) : null;
const healthchecks_1 = __importDefault(require("app/services/healthchecks"));
const app = (0, express_1.default)();
// Include config files
const config_1 = __importDefault(require("./app/configs/config"));
const status_1 = __importDefault(require("app/configs/status"));
// const loggerConfig = require('app/configs/logger');
const isDeveloping = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
// app.disable('x-powered-by');
// Include middleware
// const authsMiddleware = require('app/middlewares/auths');
// // Include routers
const healthchecks_2 = __importDefault(require("app/routes/healthchecks"));
// // Use JSON body parser
app.use(body_parser_1.default.json({
    limit: 1024102420
}));
app.use(body_parser_1.default.urlencoded({
    limit: 1024102420,
    extended: true
}));
// DB connectivity check
const dbSelfCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    let dbSelfCheckQuery = config_1.default.knex.select(config_1.default.knex.raw('now()'));
    try {
        let result = yield dbSelfCheckQuery;
        console.log(result);
        console.log('Connected to MySQL DB...');
    }
    catch (e) {
        console.log('MySQL connection error', e);
    }
});
dbSelfCheck();
// Set allowed headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,User-Agent,X-Auth,X-Version');
    if (isDeveloping) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    next();
});
// Healthcheck routes
healthchecks_1.default.init();
app.use('/healthchecks', healthchecks_2.default);
app.get('/', (req, res) => {
    res.send('pong');
});
// Use custom log format
// app.use(loggerConfig.customLogFormat);
// // Stream logs on screen for non-production
// if (isDeveloping) {
//   app.use(loggerConfig.devLogStream);
// }
// // Use middleware
// app.use(authsMiddleware);
// Routes
// Catch 404s
app.use((req, res, next) => {
    res.statusCode = 404;
    res.json(status_1.default.getStatus('url_missing'));
});
// Global error handler
app.use((err, req, res, next) => {
    if (err) {
        console.log(new Date().toISOString(), err);
    }
    if (err.hasOwnProperty('error')) {
        res.json(err);
    }
    else {
        let err = status_1.default.getStatus('generic_fail');
        res.json(err);
    }
});
app.listen(config_1.default.SERVER_PORT, config_1.default.SERVER_IP, () => {
    console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
    console.log(`${new Date()}: Server running on port ${config_1.default.SERVER_PORT}...`);
});
