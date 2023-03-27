'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const healthchecks_1 = __importDefault(require("app/controllers/healthchecks"));
router.get('/', healthchecks_1.default.healthchecks);
module.exports = router;
