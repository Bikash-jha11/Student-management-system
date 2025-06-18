"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContestCtrl = {
    filter: async (req, res) => {
        let day = Number(req.query?.day);
        let page = req.query?.page;
        let limit = 10;
        //@ts-ignore
        let startIdx = (page - 1) * limit;
        let endIdx = startIdx + limit;
    }
};
module.exports = ContestCtrl;
