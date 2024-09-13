const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const connectDB = require("./src/config/dbConfig");
const User = require("./src/models/user");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

connectDB();

function initializeWorker() {
  const worker = new Worker(
    "notification-1",
    async (job) => {
      console.log(`Processing job id: ${job.id}, data:`, job.data);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await User.create({
        name: job.data.name,
        message: job.data.message,
      });
      console.log("Job processed successfully!");
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`Job with id ${job.id} has been completed`);
  });

  worker.on("failed", (job, err) => {
    console.log(`Job with id ${job.id} has failed with error: ${err.message}`);
  });
}

module.exports = { initializeWorker };
