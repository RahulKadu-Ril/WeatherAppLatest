import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 4,
  duration: '10s'
}

export default function () {
    const city = 'hyderabad'; // Replace with your desired city for testing
    let response = http.get(`http://100.0.109.192:4000/weather?city=${city}`);
  
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time is less than 200ms': (r) => r.timings.duration < 200,
    });
  
    sleep(1);  // Add a short delay between requests (in seconds)
  }
  