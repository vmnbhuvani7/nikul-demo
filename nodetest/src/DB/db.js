import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.DATABASE_URL, options)
  .then(() => {
    console.log("db connected.");
  })
  .catch((err) => {
    console.log("Error on db connection :", err);
  });
