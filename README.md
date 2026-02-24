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
