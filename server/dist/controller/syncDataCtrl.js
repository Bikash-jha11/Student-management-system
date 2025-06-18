"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDataCtrl = void 0;
const codeForce_1 = require("./codeForce");
const StudentModel_1 = require("../models/StudentModel");
const ContestModel_1 = require("../models/ContestModel");
const SubmisiomModel_1 = require("../models/SubmisiomModel");
exports.syncDataCtrl = {
    syncData: async (req, res) => {
        const students = await StudentModel_1.Student.find({});
        for (let student of students) {
            //@ts-ignore
            const { userInfo, contestInfo, submisionInfo } = await (0, codeForce_1.fetchCfData)(student.cfHandle);
            //updating student table with live data
            const updatedStudent = await StudentModel_1.Student.findOneAndUpdate({ cfHandle: new RegExp(`^${student.cfHandle}$`, "i") }, {
                $set: {
                    currentRating: userInfo[0].rating,
                    maxRating: userInfo[0].maxRating,
                },
            });
            // await Promise.all(
            //   submisionInfo.map(async (data: any) => {
            //     const updatedSubmision = await Submision.findOneAndUpdate(
            //       {
            //         submisionId: new RegExp(`^${data.id}$`, "i"),
            //       },
            //       {
            //         $set: {
            //           studentId: student.id,
            //           problem: {
            //             contestId: data.problem.contestId,
            //             index: data.problem.index,
            //             name: data.problem.name,
            //             rating: data.problem.rating,
            //             tags: data.problem.tags,
            //           },
            //           programmingLanguage: data.programmingLanguage,
            //           verdict: data.verdict, // e.g., "OK", "WRONG_ANSWER"
            //           passedTestCount: data.passedTestCount,
            //           timeConsumedMillis: data.timeConsumedMillis,
            //           memoryConsumedBytes: data.memoryConsumedBytes,
            //           creationTime: Date.now(),
            //         },
            //       },
            //       { upsert: true }
            //     );
            //   })
            // );
            await Promise.all(submisionInfo.map(async (data) => {
                const document = await SubmisiomModel_1.Submision.findOne({ submisionId: data.id });
                if (!document) {
                    const newSubmision = new SubmisiomModel_1.Submision({
                        studentId: student.id,
                        submisionId: data.id,
                        problem: {
                            contestId: data.problem.contestId,
                            index: data.problem.index,
                            name: data.problem.name,
                            rating: data.problem.rating,
                            tags: data.problem.tags,
                        },
                        programmingLanguage: data.programmingLanguage,
                        verdict: data.verdict, // e.g., "OK", "WRONG_ANSWER"
                        passedTestCount: data.passedTestCount,
                        timeConsumedMillis: data.timeConsumedMillis,
                        memoryConsumedBytes: data.memoryConsumedBytes,
                        creationTime: new Date(data.creationTimeSeconds * 1000),
                    });
                    //@ts-ignore
                    await newSubmision.save();
                    console.log("new document saved");
                }
            }));
            await Promise.all(contestInfo.map(async (data) => {
                const document = await ContestModel_1.Contest.findOne({ contestId: data.contestId });
                if (!document) {
                    const newcontest = new ContestModel_1.Contest({
                        contestId: data.contestId,
                        contestName: data.contestName,
                        handle: student.id,
                        rank: data.rank,
                        ratingUpdateTimeSeconds: data.ratingUpdateTimeSeconds,
                        oldRating: data.oldRating,
                        newRating: data.newRating,
                    });
                    await newcontest.save();
                }
            }));
        }
    },
};
