import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Contest } from "../models/ContestModel";
import { Submision } from "../models/SubmisiomModel";
import { Student } from "../models/StudentModel";

interface ratingGraphProps {
  date: Date;
  rating: number;
}

interface contestProps {
  name: string;
  rank: Number;
  rating_change: Number;
  unsolved: Number;
}

export const detailCtrl = {
  filter: async (req: Request, res: Response) => {
    let day: number = parseInt(req.query?.day);
    let page:number = req.query?.page;
    let handle = req?.query?.handle?.toString().trim();

    let limit = 10;

   
    let startIdx = (page - 1) * limit;
    let endIdx = startIdx + limit;

    let student = await Student.findOne({ cfHandle: handle });


    let submision = await Submision.find({ studentId: student.id.toString() });

   
    let contest = await Contest.find({ handle: student.id.toString() });

    let days: number;
    if (day == 7) {
      days = Date.now() - 7 * 86400000;
    } else if (day == 30) {
      days = Date.now() - 30 * 86400000;
    } else {
      days = Date.now() - 90 * 86400000;
    }

    let days7 = Date.now() - 7 * 86400000;
    let days30 = Date.now() - 30 * 86400000;
    let days90 = Date.now() - 90 * 86400000;

    function getFilteredData(day: any, content: any) {
      const filteredContent = content.filter((data: any) => {
        //filter data of 7 90 30 day
        return data.creationTime.getTime() > day;
      });
      return filteredContent;
    }

    function getContestData(day: any, content: any) {
      const filteredContent = content.filter((data: any) => {
        //filter data of 7 90 30 day
        return data.ratingUpdateTimeSeconds * 1000 > day;
      });

      return filteredContent;
    }

    const submisionData = getFilteredData(days, submision);
    const contestData = getContestData(days, contest);

    function pipeline(
      submisionData: any,
      contestData: any
    ): {
      hardestProblem: any;
      totalProblemSolved: number;
      averageRating: number;
      ratingGraph: ratingGraphProps[];
      contestInfo: contestProps[];
    } {
      //for submision
      let hardestProblem;
      let totalProblemSolved = submisionData.length;
      let ratingSum = 0;
      let averageRating = 0;

      //for contest
       let date;
      let currRating;
      let ratingGraph: ratingGraphProps[] = [];
      let contestInfo: contestProps[] = [];

      //most difficult problem
      submisionData.map((data: any) => {
        let maxRating = 0;

        const rating = data?.problem?.rating;

        if (rating !== undefined && rating > maxRating) {
          maxRating = rating;
          hardestProblem = data;
          ratingSum += rating;
        }
        averageRating = Math.floor(ratingSum / totalProblemSolved);
      });

      contestData.map((data: any) => {
        ratingGraph.push({
          date: new Date(data.ratingUpdateTimeSeconds * 1000),
          rating: data.newRating,
        });

        contestInfo.push({
          name: data.contestName,
          rank: data.rank,
          rating_change: Math.floor(data.newRating - data.oldRating),
          unsolved: 3, //check later
        });
      });

      return {
        hardestProblem,
        totalProblemSolved,
        averageRating,
        ratingGraph,
        contestInfo,
      };
    }

    const {
      hardestProblem,
      totalProblemSolved,
      averageRating,
      ratingGraph,
      contestInfo,
    } = pipeline(submisionData, contestData);

    res.json({
      hardestProblem,
      totalProblemSolved,
      averageRating,
      ratingGraph,
      contestInfo,
    });
    // console.log({ hardestProblem,
    //   totalProblemSolved,
    //   averageRating,
    //   ratingGraph,
    //   contestInfo,})
  },
};
