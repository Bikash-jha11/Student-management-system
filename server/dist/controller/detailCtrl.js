"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailCtrl = void 0;
const ContestModel_1 = require("../models/ContestModel");
const SubmisiomModel_1 = require("../models/SubmisiomModel");
exports.detailCtrl = {
    filter: async (req, res) => {
        let day = Number(req.query?.day);
        let page = req.query?.page;
        let limit = 10;
        //@ts-ignore
        let startIdx = (page - 1) * limit;
        let endIdx = startIdx + limit;
        //@t-ignore
        const submision = await SubmisiomModel_1.Submision.find({});
        //@t-ignore
        const contest = await ContestModel_1.Contest.find({});
        let days7 = Date.now() - 7 * 86400000;
        let days30 = Date.now() - 30 * 86400000;
        let days90 = Date.now() - 90 * 86400000;
        function getFilteredData(day, content) {
            const filteredContent = content.filter((data) => {
                //filter data of 7 90 30 day
                //@ts-ignore
                return data.creationTime.getTime() > day;
            });
            return filteredContent.slice(startIdx, endIdx);
        }
        function getContestData(day, content) {
            const filteredContent = content.filter((data) => {
                //filter data of 7 90 30 day
                //@ts-ignore
                return data.ratingUpdateTimeSeconds * 1000 > day;
            });
            return filteredContent.slice(startIdx, endIdx);
        }
        const submisionData = getFilteredData(days90, submision);
        const contestData = getContestData(days90, contest);
        function pipeline(submisionData, contestData) {
            //for submision
            let hardestProblem;
            let totalProblemSolved = submisionData.length;
            let ratingSum = 0;
            let averageRating = 0;
            //for contest
            let ratingGraph;
            let rating;
            let date;
            //most difficult problem
            submisionData.map((data) => {
                let maxRating = 0;
                const rating = data?.problem?.rating;
                if (rating !== undefined && rating > maxRating) {
                    maxRating = rating;
                    hardestProblem = data;
                    ratingSum += rating;
                }
                averageRating = Math.floor(ratingSum / totalProblemSolved);
            });
            // for contest
            contestData.map((data) => {
                date = new Date(data.ratingUpdateTimeSeconds);
            });
            return { hardestProblem, totalProblemSolved, averageRating, date };
        }
        const { hardestProblem, totalProblemSolved, averageRating } = pipeline(submisionData, contestData);
        res.json({ contestData });
        // res.json({ hardestProblem, totalProblemSolved, averageRating });
    },
};
