import http from 'k6/http';
import { check, sleep } from 'k6';
const invalidCity = 'unknown';

export let options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '30m', target: 100 },
    { duration: '5m', target: 0 },
  ],
}

export default function () {
  let response = http.get(`http://100.0.109.192:4000/weather?city=${invalidCity}`);

  check(response, {
    'status is 404': (r) => r.status === 404,
    'response time is less than 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);  // Add a short delay between requests (in seconds)
}
