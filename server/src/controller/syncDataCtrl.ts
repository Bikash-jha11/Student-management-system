
import { fetchCfData } from "./codeForce";
import { Student } from "../models/StudentModel";
import { Contest } from "../models/ContestModel";
import { Submision } from "../models/SubmisiomModel";


  export default  async function syncData(){
    const students = await Student.find({});

    for (let student of students) {
      //@ts-ignore
      const { userInfo, contestInfo, submisionInfo } = await fetchCfData(
        student.cfHandle
      );

      //updating student table with live data
      const updatedStudent = await Student.findOneAndUpdate(
        { cfHandle: new RegExp(`^${student.cfHandle}$`, "i") },
        {
          $set: {
            currentRating: userInfo[0].rating,
            maxRating: userInfo[0].maxRating,
          },
        }
      );

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

      await Promise.all(
        submisionInfo.map(async (data: any) => {
          const document = await Submision.findOne({ submisionId: data.id });
          if (!document) {
            const newSubmision = new Submision({
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
           
          }
        })
      );

      await Promise.all(
        contestInfo.map(async (data: any) => {
          const document = await Contest.findOne({ contestId: data.contestId });
          if (!document) {
            const newcontest = new Contest({
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
        })
      );
    }
  }


  async function syncNewUser(id:any){
    const students = await Student.findOne({cfHandle:id});

   
     
    if(students) {


      //@ts-ignore
      const { userInfo, contestInfo, submisionInfo } = await fetchCfData(
        students.cfHandle
      );

      //updating student table with live data
      const updatedStudent = await Student.findOneAndUpdate(
        { cfHandle: new RegExp(`^${students.cfHandle}$`, "i") },
        {
          $set: {
            currentRating: userInfo[0].rating,
            maxRating: userInfo[0].maxRating,
          },
        }
      );

      

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

      await Promise.all(

        submisionInfo.map(async (data: any) => {
           console.log(data)
          const document = await Submision.findOne({ submisionId: data.id });
          if (!document) {
            const newSubmision = new Submision({
              studentId: students.id,
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
           newSubmision.save();
           
           
          }
        })
      );

      await Promise.all(
        contestInfo.map(async (data: any) => {
          const document = await Contest.findOne({ contestId: data.contestId });
          if (!document) {
            const newcontest = new Contest({
              contestId: data.contestId,
              contestName: data.contestName,
              handle: students.id,
              rank: data.rank,
              ratingUpdateTimeSeconds: data.ratingUpdateTimeSeconds,
              oldRating: data.oldRating,
              newRating: data.newRating,
            });
            newcontest.save();
           
          }
        })
      );
    }
  }



//for nodemailing 
  export async function fetchCodeforcesSubmissions(handle: string) {
  const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
  const data = await res.json();
  return data.status === 'OK' ? data.result : [];
}


module.exports = syncNewUser;
