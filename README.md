To run the backend
- docker run -d --name nats-streaming -p 4222:4222 -p 8222:8222 -p 6222:6222 nats-streaming:latest -cid my-cluster
- npm i
- npm start
- Copy .env.example to .env

- PART# 1

Creating Notification
```
curl --location 'localhost:3000/notifications' \
--header 'Content-Type: application/json' \
--data-raw '{
    "recipient": "danyal@gmail.com",
    "message": "i love yuo to",
    "type": "sms"
}'
```

Get Notification
```
curl --location 'localhost:3000/notifications'
```

Get Notification By Id
```
curl --location 'localhost:3000/notifications/a0777ecb-1e01-4f94-b80e-7fe708146da8'
```

Health
```
curl --location 'localhost:3000/health'
```

Folder Structure

notification-service/
├── README.md 
├── .env
├── package.json    
├── src/
│ ├── enums
│ └── events
│ └── routes
│ └── stores
│ └── test
│ └── utils


Design decision:

```
I have used same process for API and subscribers. NATS Streaming is used for pub/sub model.
The request for notification is sent out with "queued" status and later it will be processed
and show in GET call as delivered with respective timestamps.

If somehow the server gets down, it will even store the message and when it gets back up it will
process the message as the NATS server is waiting for "acknowledge".  This is done for heavy load.

For BONUS points: the published can be marked as "await" to make it request-reply pattern where the
call to NATS will be synchronous.  This is done for consistency.

The response is also normalized with correct error status. For error handling I have my own library
dstransaction/common

```

Improvements:

```
Logging to be added 'winston' for request and response
dead letter queue to track failure requests
API versioning
Split the services into multiple one for client and one for server
Rate Limitation can be added
```