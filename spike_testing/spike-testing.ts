import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1000 }, // Sudden ramp up stage to reach the VUs to 1000 in quick duration like a spike
    { duration: '1m', target: 0 }, // Sudden ramp down stage to reduce VUs to 0
  ],
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
}
