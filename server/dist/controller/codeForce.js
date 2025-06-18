"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCfData = fetchCfData;
const axios_1 = __importDefault(require("axios"));
//fetch code force data
//handle ==> userhandle
async function fetchCfData(handle) {
    try {
        const userRes = await axios_1.default.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        const userInfo = userRes.data.result;
        const contestRes = await axios_1.default.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const contestInfo = contestRes.data.result;
        const submisionRes = await axios_1.default.get(`https://codeforces.com/api/user.status?handle=${handle}`);
        const submisionInfo = submisionRes.data.result;
        return { userInfo, contestInfo, submisionInfo };
    }
    catch (error) {
        console.log(error);
    }
}
