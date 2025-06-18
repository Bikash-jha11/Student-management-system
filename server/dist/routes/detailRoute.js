"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const detailCtrl_1 = require("../controller/detailCtrl");
router.get('/detail', detailCtrl_1.detailCtrl.filter);
module.exports = router;
