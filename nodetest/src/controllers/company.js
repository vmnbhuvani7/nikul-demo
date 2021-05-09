const fs = require("fs");
const csv = require("fast-csv");
const { Company } = require('../models')

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    console.log("file", req.file);
    fs.createReadStream(req.file.path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        Company.insertMany(tutorials)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
      fs.unlink(req.file.path, () => {});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

export const createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).send(company)
}

export const getCompany = async (req,res) => {
  const users = await Company.find({}).populate('user');
  res.send(users);
}
