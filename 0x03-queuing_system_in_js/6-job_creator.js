import kue from 'kue';

const jobData = {
  phoneNumber: '012121',
  message: 'hello',
}

const queue = kue.createQueue();

const job = queue.create('push_notification_code', jobData)
  .save((error) => {
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    }
  });

job.on('complete', (result) => console.log('Notification job completed'));

job.on('failed', (error) => console.log('Notification job failed'));
