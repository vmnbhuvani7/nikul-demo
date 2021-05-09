// const inspector = require('@inspector-apm/inspector-nodejs')({
//     ingestionKey: '5802dd61bcd9fb11e7da2fde07c8ac3f',
// })

import inspector from "@inspector-apm/inspector-nodejs";
const key = inspector({ ingestionKey: "5802dd61bcd9fb11e7da2fde07c8ac3f" });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
import "./DB/db";
import routes from "./routes";
import axios from "axios";
import * as cron from "node-cron";
const port = process.env.PORT || 5000;
import { User } from './models'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", routes);

async function getEmployee() {
 return await axios.get('https://jsonplaceholder.typicode.com/users')
}

cron.schedule('1 * * * * *', () => {
    console.log('running a task');
    const input = {}
    getEmployee()
    .then(res => {
      res && res.data && res.data.map(item => {
        input['userId'] = item.id
        input['name'] = item.name
        input['email'] = item.email
        input['userName'] = item.username
        
        console.log("input", input);
        // User.create(input).then().catch()
      });
    })
    .catch()
})

app.listen(port, () => {
  console.log(`server listing on ${port}`);
});
