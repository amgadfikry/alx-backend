import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';
import express from 'express';

const queue = kue.createQueue();

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on('ready', () => reserveSeat(50));
let reservationEnabled = true;

function reserveSeat(number) {
  client.set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return await getAsync('available_seats');
}

const app = express();

app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({"numberOfAvailableSeats": seats});
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ "status": "Reservation are blocked" });
    return;
  }
  const job = queue.create('reserve_seat')
    .save((error) => {
      if (error) {
        res.json({ "status": "Reservation failed" });
        return;
      } else {
        res.json({ "status": "Reservation in process" });
        return;
      }
    });
    job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
    job.on('failed', (error) => console.log(`Seat reservation job ${job.id} failed: ${error}`));

});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', async (job, done) => {
    let currentSeats = await getCurrentAvailableSeats();
    reserveSeat(currentSeats - 1);
    currentSeats -= 1;
    if (currentSeats === 0) {
      reservationEnabled = false;
    } else if (currentSeats > 0) {
      done();
    } else {
      done((error) => console.log('Not enough seats available'));
    }

  });
  res.json({ "status": "Queue processing" });
});

app.listen(1245, () => console.log('ready'));
