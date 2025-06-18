import express, { Request, Response } from "express";
import axios from "axios";

//fetch code force data
//handle ==> userhandle
export async function fetchCfData(handle: any) {
  try {
    const userRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const userInfo = userRes.data.result;

    const contestRes = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const contestInfo = contestRes.data.result;

    const submisionRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=300`
    );
    const submisionInfo = submisionRes.data.result;

    return { userInfo, contestInfo, submisionInfo };
  } catch (error) {
    console.log(error);
  }
}


