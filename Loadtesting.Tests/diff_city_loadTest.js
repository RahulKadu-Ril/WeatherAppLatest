import http from 'k6/http';
import { check, sleep } from 'k6';
const cities = ['hyderabad', 'patna', 'jammu', 'goa','mumbai','pune','chennai'];

export let options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '30m', target: 100 },
    { duration: '5m', target: 0 },
  ]
}

export default function () {
  const city = __VU % cities.length;  // Cycle through the array of cities
  let response = http.get(`http://100.0.105.40:4000/weather?city=${cities[city]}`);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 1500ms': (r) => r.timings.duration < 1500,
  });

  sleep(1);  // Add a short delay between requests (in seconds)
}
