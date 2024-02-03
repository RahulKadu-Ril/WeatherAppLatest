import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const city = 'hyderabad'; // Replace with your desired city for testing
    let response = http.get(`http://localhost:4000/weather?city=${city}`);
  
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time is less than 500ms': (r) => r.timings.duration < 500,
      'has temperature field': (r) => JSON.parse(r.body).hasOwnProperty('temperature'),
    });
  
    sleep(1);  // Add a short delay between requests (in seconds)
  }
  