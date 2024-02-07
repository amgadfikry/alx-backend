# 0x03-queuing_system_in_js

### Requirements
- All of your code will be compiled/interpreted on Ubuntu 18.04, Node 12.x, and Redis 5.0.7
- All of your files should end with a new line
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the js extension

### tasks

#### 0-redis_client.js
Install node_redis using npm
Using Babel and ES6, write a script named 0-redis_client.js. It should connect to the Redis server running on your machine:
- It should log to the console the message Redis client connected to the server when the connection to Redis works correctly
- It should log to the console the message Redis client not connected to the server: ERROR_MESSAGE when the connection to Redis does not work
Requirements:
- To import the library, you need to use the keyword import

#### 1-redis_op.js
in a file 1-redis_op.js, copy the code you previously wrote (0-redis_client.js).
Add two functions:
- setNewSchool:
-- It accepts two arguments schoolName, and value.
-- It should set in Redis the value for the key schoolName
-- It should display a confirmation message using redis.print
- displaySchoolValue:
-- It accepts one argument schoolName.
-- It should log to the console the value for the key passed as argument
At the end of the file, call:
- displaySchoolValue('Holberton');
- setNewSchool('HolbertonSanFrancisco', '100');
- displaySchoolValue('HolbertonSanFrancisco');
Requirements:
Use callbacks for any of the operation, we will look at async operations later

#### 2-redis_op_async.js
In a file 2-redis_op_async.js, let’s copy the code from the previous exercise (1-redis_op.js)
Using promisify, modify the function displaySchoolValue to use ES6 async / await
Same result as 1-redis_op.js

#### 4-redis_advanced_op.js
Create Hash:
Using hset, let’s store the following:
- The key of the hash should be HolbertonSchools
- It should have a value for:
-- Portland=50
-- Seattle=80
-- New York=20
-- Bogota=20
-- Cali=40
-- Paris=2
-- Make sure you use redis.print for each hset
Display Hash:
Using hgetall, display the object stored in Redis. It should return the following:
Requirements:
Use callbacks for any of the operation, we will look at async operations later

#### 5-subscriber.js, 5-publisher.js
In a file named 5-subscriber.js, create a redis client:
- On connect, it should log the message Redis client connected to the server
- On error, it should log the message Redis client not connected to the server: ERROR MESSAGE
- It should subscribe to the channel holberton school channel
- When it receives message on the channel holberton school channel, it should log the message to the console
- When the message is KILL_SERVER, it should unsubscribe and quit
In a file named 5-publisher.js, create a redis client:
- On connect, it should log the message Redis client connected to the server
- On error, it should log the message Redis client not connected to the server: ERROR MESSAGE
- Write a function named publishMessage:
-- It will take two arguments: message (string), and time (integer - in ms)
-- After time millisecond:
--- The function should log to the console About to send MESSAGE
--- The function should publish to the channel holberton school channel, the message passed in argument after the time passed in arguments

#### 6-job_creator.js
In a file named 6-job_creator.js:
- Create a queue with Kue
- Create an object containing the Job data with the following format:
```
{
  phoneNumber: string,
  message: string,
}
```
- Create a queue named push_notification_code, and create a job with the object created before
- When the job is created without error, log to the console Notification job created: JOB ID
- When the job is completed, log to the console Notification job completed
- When the job is failing, log to the console Notification job failed

#### 6-job_processor.js
In a file named 6-job_processor.js:
- Create a queue with Kue
- Create a function named sendNotification:
-- It will take two arguments phoneNumber and message
-- It will log to the console Sending notification to PHONE_NUMBER, with message: MESSAGE
- Write the queue process that will listen to new jobs on push_notification_code:
-- Every new job should call the sendNotification function with the phone number and the message contained within the job data
Requirements:
- You only need one Redis server to execute the program
- You will need to have two node processes to run each script at the same time
- You muse use Kue to set up the queue

#### 7-job_creator.js
In a file named 7-job_creator.js:
Create an array jobs with the following data inside:
```
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];
```
After this array created:
- Create a queue with Kue
- Write a loop that will go through the array jobs and for each object:
-- Create a new job to the queue push_notification_code_2 with the current object
-- If there is no error, log to the console Notification job created: JOB_ID
-- On the job completion, log to the console Notification job JOB_ID completed
-- On the job failure, log to the console Notification job JOB_ID failed: ERROR
-- On the job progress, log to the console Notification job JOB_ID PERCENTAGE% complete

#### 7-job_processor.js
in a file named 7-job_processor.js:
Create an array that will contain the blacklisted phone numbers. Add in it 4153518780 and 4153518781 - these 2 numbers will be blacklisted by our jobs processor.
Create a function sendNotification that takes 4 arguments: phoneNumber, message, job, and done:
- When the function is called, track the progress of the job of 0 out of 10
- If phoneNumber is included in the “blacklisted array”, fail the job with an Error object and the message: Phone number PHONE_NUMBER is blacklisted
- Otherwise:
-- Track the progress to 50%
-- Log to the console Sending notification to PHONE_NUMBER, with message: MESSAGE
Create a queue with Kue that will proceed job of the queue push_notification_code_2 with two jobs at a time.
Requirements:
- You only need one Redis server to execute the program
- You will need to have two node processes to run each script at the same time
- You muse use Kue to set up the queue
- Executing the jobs list should log to the console the following:

#### 8-job.js
In a file named 8-job.js, create a function named createPushNotificationsJobs:
- It takes into argument jobs (array of objects), and queue (Kue queue)
- If jobs is not an array, it should throw an Error with message: Jobs is not an array
- For each job in jobs, create a job in the queue push_notification_code_3
- When a job is created, it should log to the console Notification job created: JOB_ID
- When a job is complete, it should log to the console Notification job JOB_ID completed
- When a job is failed, it should log to the console Notification job JOB_ID failed: ERROR
- When a job is making progress, it should log to the console Notification job JOB_ID PERCENT% complete

#### 8-job.test.js
Now that you created a job creator, let’s add tests:
- Import the function createPushNotificationsJobs
- Create a queue with Kue
- Write a test suite for the createPushNotificationsJobs function:
-- Use queue.testMode to validate which jobs are inside the queue
-- etc.
Requirements:
- Make sure to enter the test mode without processing the jobs before executing the tests
- Make sure to clear the queue and exit the test mode after executing the tests

#### 9-stock.js
Data
Create an array listProducts containing the list of the following products:
- Id: 1, name: Suitcase 250, price: 50, stock: 4
- Id: 2, name: Suitcase 450, price: 100, stock: 10
- Id: 3, name: Suitcase 650, price: 350, stock: 2
- Id: 4, name: Suitcase 1050, price: 550, stock: 5
Data access
Create a function named getItemById:
- It will take id as argument
- It will return the item from listProducts with the same id
Server
Create an express server listening on the port 1245. (You will start it via: npm run dev 9-stock.js)
Products
Create the route GET /list_products that will return the list of every available product with the following JSON format:
In stock in Redis
Create a client to connect to the Redis server:
- Write a function reserveStockById that will take itemId and stock as arguments:
- It will set in Redis the stock for the key item.ITEM_ID
- Write an async function getCurrentReservedStockById, that will take itemId as an argument:
- It will return the reserved stock for a specific item
Product detail
Create the route GET /list_products/:itemId, that will return the current product and the current available stock (by using getCurrentReservedStockById)
Reserve a product
Create the route GET /reserve_product/:itemId:
Requirements:
- Make sure to use promisify with Redis
- Make sure to use the await/async keyword to get the value from Redis
- Make sure the format returned by the web application is always JSON and not text

#### 100-seat.js
Redis
Create a Redic client:
- Create a function reserveSeat, that will take into argument number, and set the key available_seats with the number
- Create a function getCurrentAvailableSeats, it will return the current number of available seats (by using promisify for Redis)
- When launching the application, set the number of available to 50
- Initialize the boolean reservationEnabled to true - it will be turn to false when no seat will be available
- Kue queue
- Create a Kue queue
Server
- Create an express server listening on the port 1245. (You will start it via: npm run dev 100-seat.js)
- Add the route GET /available_seats that returns the number of seat available:
- Add the route GET /reserve_seat that:
- Returns { "status": "Reservation are blocked" } if reservationEnabled is false
- Creates and queues a job in the queue reserve_seat:
- Save the job and return:
- { "status": "Reservation in process" } if no error
- Otherwise: { "status": "Reservation failed" }
- When the job is completed, print in the console: Seat reservation job JOB_ID completed
- When the job failed, print in the console: Seat reservation job JOB_ID failed: ERROR_MESSAGE
- Add the route GET /process that:
- Returns { "status": "Queue processing" } just after:
- Process the queue reserve_seat (async):
- Decrease the number of seat available by using getCurrentAvailableSeats and reserveSeat
- If the new number of available seats is equal to 0, set reservationEnabled to false
- If the new number of available seats is more or equal than 0, the job is successful
- Otherwise, fail the job with an Error with the message Not enough seats available
Requirements:
- Make sure to use promisify with Redis
- Make sure to use the await/async keyword to get the value from Redis
- Make sure the format returned by the web application is always JSON and not text
- Make sure that only the allowed amount of seats can be reserved
- Make sure that the main route is displaying the right number of seats
