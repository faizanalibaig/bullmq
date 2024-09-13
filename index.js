const express = require("express");
const { createProducerJob } = require("./producer");
const { initializeWorker } = require("./worker");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.post("/produce-job", async (req, res) => {
  try {
    const jobData = req.body;
    await createProducerJob(jobData);
    res.status(200).json({ message: "Job added to the queue", data: jobData });
  } catch (error) {
    console.error("Error adding job to the queue:", error);
    res.status(500).send("Failed to add job");
  }
});

initializeWorker();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
