"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentCtrl = void 0;
const StudentModel_1 = require("../models/StudentModel");
exports.studentCtrl = {
    //get detail of all student ot show in student table
    getDetail: async (req, res) => {
        const result = await StudentModel_1.Student.find();
        return res.json({ result });
    },
};
