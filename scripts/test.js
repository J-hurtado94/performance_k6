import http from 'k6/http';
import {check, sleep } from 'k6';

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
 
  const res =http.get('https://globalmvm.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
 
  sleep(1);
}
