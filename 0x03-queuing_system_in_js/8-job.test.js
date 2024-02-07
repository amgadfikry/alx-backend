import kue from 'kue';
import chai from 'chai';
import createPushNotificationsJobs from './8-job.js';

const queue = kue.createQueue();
const expect = chai.expect

before(() => {
  queue.testMode.enter();
});

afterEach(() => {
  queue.testMode.clear()
});

after(() => {
  queue.testMode.exit();
});

describe("test suit", () => {
  it('test metadata', async () => {
    const arr = [{'id': '1', 'msg': 'hello'}, {'id': '2', 'msg': 'welcome'}];
    await createPushNotificationsJobs(arr, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal({'id': '1', 'msg': 'hello'});
    expect(queue.testMode.jobs[1].data.id).to.equal("2");
  });
  it('error', () => {
    const str = 'string';
    const result = () => createPushNotificationsJobs(str, queue);
    expect(result).to.throw('Jobs is not an array');
  })
});
