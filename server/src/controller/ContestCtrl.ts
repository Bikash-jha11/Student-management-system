import express,{Request,Response} from 'express';
import { detailCtrl } from './detailCtrl';


const ContestCtrl = {
 filter: async(req:Request,res:Response) => {
    let day = Number(req.query?.day);
    let page = req.query?.page;

    let limit = 10;

    //@ts-ignore
    let startIdx = (page - 1) * limit;
    let endIdx = startIdx + limit;
 }

}

module.exports = ContestCtrl;