const { Queue } = require("bullmq");

const notificationKue = new Queue("notification", {
  connection: {
    host: "127.0.0.1",
    port: "6379",
  },
});

async function init() {
  for (let i = 0; i < 100; i++) {
    const result = await notificationKue.add("email to zyn", {
      email: "zyn@gmail.com",
      subject: "new message",
      body: "hey zyn, how are you?",
    });

    console.log("job added to kue", result.id);
  }
}

init();
