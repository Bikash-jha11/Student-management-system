"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const syncDataCtrl_1 = require("../controller/syncDataCtrl");
// @ts-ignore
router.get('/test', syncDataCtrl_1.syncDataCtrl.syncData);
module.exports = router;
