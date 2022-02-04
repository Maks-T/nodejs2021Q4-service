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

## Andpoints

### `/users`

<details>
  <summary>GET /users - get all users (remove password from response)</summary>

`Example response`

```javascript
[
  {
    id: '687a13d9-c1e9-4348-adb8-8f7280b901e9',
    name: 'Maxim',
    login: 'Max-T',
  },
];
```

</details>
<details>
  <summary>GET /users/:userId - get the user by id (ex. “/users/687a13d9-c1e9-4348-adb8-8f7280b901e9”) (remove password from response)</summary>   
  
  `Example response`
  ```javascript    
    {
      "id": "687a13d9-c1e9-4348-adb8-8f7280b901e9",
      "name": "Maxim",
      "login": "Max-T"
    }    
  ```  
</details>

<details>
  <summary>POST /users - create user</summary>

`Example request`

```javascript
[
  {
    name: 'Maxim',
    login: 'Max-T',
    password: 'P123*',
  },
];
```

`Example response`

```javascript
[
  {
    id: '687a13d9-c1e9-4348-adb8-8f7280b901e9',
    name: 'Maxim',
    login: 'Max-T',
  },
];
```

</details>

PUT /users/:userId - update user
DELETE /users/:userId - delete user
Board (/boards route)
GET /boards - get all boards
GET /boards/:boardId - get the board by id
POST /boards - create board
PUT /boards/:boardId - update board
DELETE /boards/:boardId - delete board
Task (boards/:boardId/tasks route)
GET boards/:boardId/tasks - get all tasks
GET boards/:boardId/tasks/:taskId - get the task by id
POST boards/:boardId/tasks - create task
PUT boards/:boardId/tasks/:taskId - update task
DELETE boards/:boardId/tasks/:taskId - delete task
