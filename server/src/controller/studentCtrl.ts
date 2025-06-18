import express, { Request, Response } from "express";
import { Student } from "../models/StudentModel";
import syncData from "../controller/syncDataCtrl";
import syncNewUser from "../controller/syncDataCtrl";

export const studentCtrl = {
  //get detail of all student ot show in student table
  getDetail: async (req: Request, res: Response) => {
    const result = await Student.find();
    return res.json({ result });
  },

  addStudent: async (req: Request, res: Response) => {
    const { name, email, phone, codeforcehandle } = req.body;
    const newStudent = new Student({
      name: name,
      email: email,
      phone: phone,
      cfHandle: codeforcehandle,
      maxRating: 0,
      currentRating: 0,
    });

    await newStudent.save();
    

     if(newStudent){
       await syncNewUser(newStudent.cfHandle);
     }

    res.json({
      msg: "user created",
    });
  },
};
