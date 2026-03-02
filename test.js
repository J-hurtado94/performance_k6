import http from 'k6/http';
import {check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
export const options = {
  // Define the number of iterations for the test
  stages: [
    { duration: '10s', target: 15 },
    { duration: '20s', target: 15 },
    { duration: '10s', target: 0 },
  ],
 
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  // Make a GET request to the target URL
  const res =http.get('https://globalmvm.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}



export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
    
 stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
    'summary.html': htmlReport(data),    

  };

}
