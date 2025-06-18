import mongoose from "mongoose";

class ConnectToDb {
  url!: string;

  connect(url: string) {
    mongoose.connect(url).then(() => {
      console.log("Connected to Database");
    })
  }
}

export default ConnectToDb;
