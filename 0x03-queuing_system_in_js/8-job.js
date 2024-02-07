function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((el) => {
    const job = queue.create('push_notification_code_3', el)
      .save((error) => {
        if (!error) {
          console.log(`Notification job created: ${job.id}`);
        }
      })
      .on('complete', (result) => console.log(`Notification job ${job.id} completed`))
      .on('failed', (error) => console.log(`Notification job ${job.id} failed: ${error}`))
      .on('progress', (progress, data) => console.log(`Notification job ${job.id} ${progress}% complete`));
  });
}

export default createPushNotificationsJobs;
