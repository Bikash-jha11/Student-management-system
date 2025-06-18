import express from "express";
const router = express.Router();
import {detailCtrl} from '../controller/detailCtrl'

router.get('/analytics',detailCtrl.filter)


module.exports = router;