const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const mongoose = require("mongoose");
const connectDB = require("./src/config/dbConfig");
const User = require("./src/models/user");

connectDB();

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "notification",
  async (job) => {
    console.log(`Processing job id: ${job.id}, data:`, job.data);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
    console.log("Email sent successfully!");

    const processedData = new User({
      email: job.data.email,
      status: "Processed",
      jobData: job.data, // Store the entire job data
    });

    try {
      await processedData.save();
      console.log(`Processed data saved to MongoDB for job id: ${job.id}`);
    } catch (error) {
      console.error(`Error saving processed data for job id ${job.id}:`, error);
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job with id ${job.id} has been completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job with id ${job.id} has failed with error: ${err.message}`);
});
