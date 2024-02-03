import http from 'k6/http';

import { check, sleep } from 'k6';
const cities = ['hyderabad', 'patna', 'jammu', 'goa'];

export let options = {
    vus: 100,
    duration: '60s',
    // ext: {
    //   influxdb: {
    //     url: 'http://influxdb.example.com:8086', // Replace with your InfluxDB URL
    //     token: 'your-influxdb-token',            // Replace with your InfluxDB token
    //     org: 'your-influxdb-org',                 // Replace with your InfluxDB organization
    //     bucket: 'your-influxdb-bucket',           // Replace with your InfluxDB bucket
    //   },
    // },
}

export default function () {
  const city = __VU % cities.length;  // Cycle through the array of cities
  let response = http.get(`http://100.0.105.40:4000/weather?city=${cities[city]}`);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 1000ms': (r) => r.timings.duration < 1000,
  });

  // sleep(1);  // Add a short delay between requests (in seconds)
}
