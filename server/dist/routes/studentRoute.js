"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const studentCtrl_1 = require("../controller/studentCtrl");
//@ts-ignore
router.get("/getdetail", studentCtrl_1.studentCtrl.getDetail);
module.exports = router;
