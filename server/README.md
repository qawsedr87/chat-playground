# Server 

For the backend, I use NodeJS with the Express framework and store the user data at localstorage in memory. I also use Socket.io to handle real-time communication.


First, let's set up the basic NodeJS codebase and dependencies:

```shell
npm init -y
npm install express socket.io cors
```

## Later on 
If using this structure to add extra constraints or functions to the socket, it will become increasingly complex. Therefore, in the near future, I plan to define helper APIs and endpoints for creating ideal multiplayer game rooms.