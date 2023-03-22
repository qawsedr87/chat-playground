# Playground 

For the frontend, I use MUI (Material-UI) to build the UI components, and also use `socket.io-client` to connect to the backend server.

First, let's set up the basic react codebase and dependencies:

```shell
npx create-react-app ./
npm install socket.io-client react-router-dom
npm i @emotion/react @emotion/styled @mui/material @emotion/react
```

## Trick for Material-UI
I developed the frontend project using `react@"^18.2.0"`. However, some of the material-ui dependencies were not supported by this version. To address this issue, I used the `--legacy-peer-deps` flag while installing the dependencies. For example:

```
npm i @material-ui/core --legacy-peer-deps
```

Please note that using the `--legacy-peer-deps` flag is not an ideal solution, but it allowed me to resolve the dependency issue.

## Process

Kindly know that runnning server at `./server` folder first and then running `npm run start` at `./playground` 