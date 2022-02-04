# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/)

## Before you start, you must:

- `git clone https://github.com/Maks-T/nodejs2021Q4-service/tree/task-10-nestjs` - clones the repository ;
- `cd nodejs2021Q4-service` - nodejs2021Q4-service;
- `git checkout task-10-nestjs` - select the `task-10-nestjs` branch;

## Launch the application, you must

- `docker-compose up --build`
- wait a bit. The application will restart several times. The database will be created. Migrations will run automatically.
- After starting the app on port (4000 as default) you can open
- To work correctly, you need to log in.
  Learn more: route - `/login`

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

If you did not pass the header with the token to the routes when contacting them

```javascript
    "Authorization": "Bearer ${token}"
```

In response, you will get an error:

```javascript
  {
    "statusCode": 401,
    "message": "The user is not logged in"
  }
```

### Authorization `/users`

  <details>
    <summary>POST /login - get all users (remove password from response)</summary>
  
  `Example request`
  
  ```javascript
  
  {    
    login: 'Max-T',
    password: 'P123*',
  },
  
  ```
  
  `Example response StatusCode == 200`
  
  ```javascript
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMzQ3Y2Y3ZS0wNGQ4LTRkNmItYjk3OS1lZWVmZjExMGIzZWQiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjQzOTc0MDc1LCJleHAiOjE2NDQwNjA0NzV9.wKxuVNlqh1_Is8p1gdnLpYRjVqNznoxYSnOl1ukMmCU"
  }
  ```
  
  </details>

### Users `/users`

  <details>
    <summary>GET /users - get all users (remove password from response)</summary>
  
  `Example response StatusCode == 200`
  
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
    
    `Example response StatusCode == 200`

    ```javascript
      {
        id: "687a13d9-c1e9-4348-adb8-8f7280b901e9",
        name: "Maxim",
        login: "Max-T"
      }
    ```

  </details>
  
  <details>
    <summary>POST /users - create user</summary>
  
  `Example request`
  
  ```javascript
  
  {
    name: 'Maxim',
    login: 'Max-T',
    password: 'P123*',
  },
  
  ```
  
  `Example response StatusCode == 201`
  
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
    <summary>PUT /users/:userId - update user</summary>
  
  `Example request`
  
  ```javascript
  [
    {
      name: 'Maximus',
      login: 'Max-T',
      password: 'P33333*',
    },
  ];
  ```
  
  `Example response StatusCode == 200`
  
  ```javascript
  [
    {
      id: '687a13d9-c1e9-4348-adb8-8f7280b901e9',
      name: 'Maximus',
      login: 'Max-T',
    },
  ];
  ```
  
  </details>
  
  <details>
    <summary>DELETE /users/:userId - delete user</summary>
  
  `Example response StatusCode == 204`
  
  </details>
  
### Boards `/boards`
  
  <details>
    <summary>GET /boards - get all boards</summary>
  
  `Example response StatusCode == 200`
  
  ```javascript
  {
    id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
    title: "Board Title",
    columns: [
      {
        id: "445e4eb2-8af6-4e74-9d02-c420d29086f4",
        title: "First column",
        order: 1,
        tasks: []
      },
      {
        id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
        title: "Second column",
        order: 2,
        tasks: []
      }
    ]
  }
  ```
  
  </details>
  <details>
    <summary>GET /boards/:boardId - get the board by id</summary>   
    
    `Example response StatusCode == 200`
    
    ```javascript    
      {
        id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
        title: "Board Title",
        columns: [
          {
            id: "445e4eb2-8af6-4e74-9d02-c420d29086f4",
            title: "First column",
            order: 1,
            tasks: []
          },
          {
            id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
            title: "Second column",
            order: 2,
            tasks: []
          }
        ]
      }  
    ```  
  </details>
  
  <details>
    <summary>POST /boards - create board</summary>
  
  `Example request`
  
  ```javascript
  {
    title: "Board Title",
    columns: [
      {
        title: "First column",
        order: 1
      },
      {
        title: "Second column",
        order: 2
      }
    ]
  }
  ```
  
  `Example response StatusCode == 201`
  
  ```javascript
  {
    id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
    title: "Board Title",
    columns: [
      {
        id: "445e4eb2-8af6-4e74-9d02-c420d29086f4",
        title: "First column",
        order: 1,
        tasks: []
      },
      {
        id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
        title: "Second column",
        order: 2,
        tasks: []
      }
    ]
  }
  ```
  
  </details>
  
  <details>
    <summary>PUT /boards/:boardId - update board</summary>
  
  `Example request`
  
  ```javascript
  {
    title: "Board Title",
    columns: [
      {
        title: "First column new",
        order: 1
      },
      {
        title: "Second column new",
        order: 2
      }
    ]
  }
  ```
  
  `Example response StatusCode == 200`
  
  ```javascript
  {
    id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
    title: "Board Title",
    columns: [
      {
        id: "445e4eb2-8af6-4e74-9d02-c420d29086f4",
        title: "First column new",
        order: 1,
        tasks: []
      },
      {
        id: "aa25fe8b-f560-479d-ad70-e400cbb82ef6",
        title: "Second column new",
        order: 2,
        tasks: []
      }
    ]
  }
  ```
  
  </details>
  
  <details>
    <summary>DELETE /boards/:boardId - delete board</summary>
  
  `Example response StatusCode == 204`
  
  </details>
  
### Tasks `boards/:boardId/tasks`
  
  <details>
    <summary>GET boards/:boardId/tasks - get all tasks</summary>
  
  `Example response StatusCode == 200`
  
  ```javascript
  [
    {
      id: 'd1734b2a-c52b-47f5-8c0b-8cbede5f740d',
      title: 'Task Title',
      order: 1,
      description: 'Task Description',
      userId: 'fc570e9c-9392-4c4a-bbf8-4e5c64703bd6',
      columnId: 'bb29cb1d-03fc-449b-a576-a08c07e23159',
      boardId: 'bb29cb1d-03fc-449b-a576-a08c07e23159',
    },
  ];
  ```
  
  </details>
  <details>
    <summary>GET boards/:boardId/tasks/:taskId - get the task by id</summary>   
    
    `Example response StatusCode == 200`

    ```javascript
      {
        id: "d1734b2a-c52b-47f5-8c0b-8cbede5f740d",
        title: "Task Title",
        order: 1,
        description: "Task Description",
        userId: "fc570e9c-9392-4c4a-bbf8-4e5c64703bd6" || null,
        columnId: "bb29cb1d-03fc-449b-a576-a08c07e23159"  || null,
        boardId: "bb29cb1d-03fc-449b-a576-a08c07e23159"

}

````

  </details>

  <details>
    <summary>POST boards/:boardId/tasks - create task</summary>

  `Example request`

  ```javascript
  {
    title: "Task Title",
    order: 1,
    description: "Task Description",
    userId: "fc570e9c-9392-4c4a-bbf8-4e5c64703bd6",
    columnId: "bb29cb1d-03fc-449b-a576-a08c07e23159"
  }

````

`Example response StatusCode == 201`

```javascript
{
  id: "d1734b2a-c52b-47f5-8c0b-8cbede5f740d",
  title: "Task Title",
  order: 1,
  description: "Task Description",
  userId: "fc570e9c-9392-4c4a-bbf8-4e5c64703bd6",
  columnId: "bb29cb1d-03fc-449b-a576-a08c07e23159",
  boardId: "bb29cb1d-03fc-449b-a576-a08c07e23159"
}
```

  </details>
  
  <details>
    <summary>PUT boards/:boardId/tasks/:taskId - update task</summary>
  
  `Example request`
  
  ```javascript
  {
    title: "Task Title",
    order: 1,
    description: "Task Description",
    userId: "fc570e9c-9392-4c4a-bbf8-4e5c64703bd6",
    columnId: "bb29cb1d-03fc-449b-a576-a08c07e23159"
  }
  ```
  
  `Example response StatusCode == 200`
  
  ```javascript
  {
    id: "d1734b2a-c52b-47f5-8c0b-8cbede5f740d",
    title: "Task Title",
    order: 1,
    description: "Task Description",
    userId: "fc570e9c-9392-4c4a-bbf8-4e5c64703bd6",
    columnId: "bb29cb1d-03fc-449b-a576-a08c07e23159",
    boardId: "bb29cb1d-03fc-449b-a576-a08c07e23159"
  }
  ```
  
  </details>
  
  <details>
    <summary>DELETE boards/:boardId/tasks/:taskId - delete task</summary>
  
  `Example response StatusCode == 204`
  
  </details>

### File `/file`

  <details>
    <summary>POST file/ - send file</summary>
  
  `Example response StatusCode == 200`

```javascript

  {
     message: "The 1.PNG was successfully uploaded to the server! To download this file, use the link 'localhost:4000/file/1643970214678.PNG'",
     linkForDownload: "localhost:4000/file/1643970214678.PNG"
  }

```

</details>

  <details>
    <summary>POST file/:filename - get file</summary>
  
  `Example response StatusCode == 200`

</details>

![File-load-screen](https://user-images.githubusercontent.com/28530542/152523862-7f99c885-3654-45c1-ae5e-bb2de9e64ac8.PNG)

## Loading test

[Grafana k6](https://k6.io/) is used for loading tests. The test script and test reports are in the `/load-testing-K6` folder.

### Fastify test table:
![Fastify-test-table](https://user-images.githubusercontent.com/28530542/152580679-71543ed9-8738-4b0b-a8d4-a217def40d42.PNG)

### Express test table:
![Express-test-table](https://user-images.githubusercontent.com/28530542/152580877-0e3ecd38-c19a-42da-8990-9d1c8d55733a.PNG)

