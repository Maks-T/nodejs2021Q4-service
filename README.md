# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/)

## Before you start, you must:

- `git clone https://github.com/Maks-T/nodejs2021Q4-service/tree/task-9-authentication-JWT` - clones the repository ;
- `cd nodejs2021Q4-service` - nodejs2021Q4-service;
- `git checkout task-9-authentication-JWT` - select the `task-9-authentication-JWT` branch;

## Launch the application, you must

- `docker-compose up --build`
- wait a bit. The application will restart several times. The database will be created. Migrations will run automatically.
- After starting the app on port (4000 as default) you can open

## Installing NPM modules

- `npm i` or `npm install` - install dependencies;

## Testing

After application running open new terminal and enter:

To run all tests without

- `npm run test:auth`

### Auto-fix and format

- `npm run lint`

## Work with migrations

- generate: `npm run typeorm -- migration:generate -n Name`

- run: `npm run typeorm -- migration:run`

- revert: `npm run typeorm -- migration:revert`
