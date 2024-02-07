import redis from 'redis';

const client = redis.createClient();

client.on('ready', () => console.log('Redis client connected to the serve'));

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});

client.subscribe('holberton school channel');
