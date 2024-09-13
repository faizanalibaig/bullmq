const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const notificationQueue = new Queue("notification-1", { connection });

async function createProducerJob(jobData) {
  try {
    await notificationQueue.add("sendEmail", jobData);
    console.log("Job added to queue:", jobData);
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
}

module.exports = { createProducerJob };
