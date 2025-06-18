import express from "express";
const router = express.Router();
import { studentCtrl } from "../controller/studentCtrl";

//@ts-ignore
router.get("/getdetail", studentCtrl.getDetail);
router.post("/addStudent", studentCtrl.addStudent);

module.exports = router;
