import http from 'k6/http';
import { check, group, sleep } from 'k6';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
  const nameReport = `result-${__ENV.APP_TYPE}.html`;

  return {
    [nameReport]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export const options = {
  stages: [{ target: 70, duration: '30s' }],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1500'],
  },
};

function randomString(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

const LOGIN = `admin`;
const PASSWORD = `admin`;
const BASE_URL = `http://localhost:4000`;

export function setup() {
  const loginRes = http.post(`${BASE_URL}/login`, {
    login: LOGIN,
    password: PASSWORD,
  });

  const authToken = loginRes.json('token');
  check(authToken, { 'logged in successfully': () => authToken !== '' });

  return authToken;
}

export default (authToken) => {
  const requestConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  group('Create and modify Users', () => {
    let URL = `${BASE_URL}/users`;

    group('Create users', () => {
      const payload = {
        name: `admin_${randomString(10)}`,
        login: `admin_${randomString(10)}`,
        password: `admin_${randomString(10)}`,
      };

      const res = http.post(URL, payload, requestConfig);

      if (check(res, { 'User created correctly': (r) => r.status === 201 })) {
        URL = `${URL}/${res.json('id')}`;
      } else {
        console.log(`Unable to create a user ${res.status} ${res.body}`);
        return;
      }
    });

    group('Get user', () => {
      const res = http.get(URL, requestConfig);
      const isSuccessfulGet = check(res, {
        'User exists': () => res.status === 200,
      });

      if (!isSuccessfulGet) {
        console.log(`User not exists ${res.status} ${res.body}`);
        return;
      }
    });

    group('Update user', () => {
      const payload = {
        name: `New name`,
        login: `admin_${randomString(10)}`,
        password: `New password`,
      };
      const res = http.put(URL, payload, requestConfig);
      const isSuccessfulUpdate = check(res, {
        'Update worked': () => res.status === 200,
        'Updated name is correct': () => res.json('name') === 'New name',
      });

      if (!isSuccessfulUpdate) {
        console.log(`Unable to update the user ${res.status} ${res.body}`);
        return;
      }
    });

    group('Delete user', () => {
      const delRes = http.del(URL, null, requestConfig);

      const isSuccessfulDelete = check(null, {
        'User was deleted correctly': () => delRes.status === 204,
      });

      if (!isSuccessfulDelete) {
        console.log(`User was not deleted properly`);
        return;
      }
    });

    group('Delete not existed user', () => {
      const delRes = http.del(URL, null, requestConfig);

      const isNotSuccessfulDelete = check(null, {
        'User was deleted correctly': () => delRes.status === 404,
      });

      if (!isNotSuccessfulDelete) {
        console.log(`User was not deleted properly`);
        return;
      }
    });
  });

  sleep(1);
};
