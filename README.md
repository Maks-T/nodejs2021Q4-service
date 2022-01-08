# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/)

## Before you start, you must:

- `git clone https://github.com/Maks-T/nodejs2021Q4-service/tree/task-7-docker-basics` - clones the repository ;
- `cd nodejs2021Q4-service` - nodejs2021Q4-service;
- `git checkout task-7-docker-basics` - select the `task-7-docker-basics` branch;

## Installing NPM modules

- `npm i` or `npm install` - install dependencies;

## Docker run

```
docker-compose up --build
```

## Running application

- `npm run start`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

- `npm run test`

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

- `npm run lint`

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
