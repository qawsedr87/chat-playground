# chat-playground

This repository serves as a proof of concept for a small multiplayer playground - chat, using socket.io.

## Game Pitch 
The game is similar to "The Werewolves of Millers Hollow". Here's a high-level overview of how the game might work:

- The master creates a room with a unique name and password, and enters their own name.
- The master shares the room name and password with guests, along with a link to join the room.
- Guests enter the room name, password, and their own name to join the game.
- Once 7 players have joined the room, the game begins.
- Each player is randomly assigned a role (e.g. werewolf or villager).
- During the night phase, werewolves can choose a victim to eliminate.
- During the day phase, all players discuss and vote on who they think the werewolf is.
- If the werewolf is correctly identified and eliminated, the villagers win. Otherwise, the werewolf wins.

## Getting Start

```shell
git clone https://github.com/qawsedr87/chat-playground.git
cd chat-playground
```

### Backend (NodeJS)
more information is at [./server](./server/)

```shell
cd server
npm i 
npm run start
```

### Frontend (MUI)
more information is at [./playground](./playground/)

```shell
cd playground
npm i 
npm run start
```

