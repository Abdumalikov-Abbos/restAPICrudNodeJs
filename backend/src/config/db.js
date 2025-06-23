import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connnecting MongoDb",err);
    process.exit(1) //exit with failure
  }
};
