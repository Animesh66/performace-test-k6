import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp up stage to reach the VUs to 10
    { duration: '1m', target: 10 }, // Steady state where VUs are kept constant at 10
    { duration: '10s', target: 0 }, // Ramp down stage to reduce VUs to 0
  ],
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  res = http.get('https://quickpizza.grafana.com/contacts.php');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/pi.php?decimals=3');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/flip_coin.php');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/browser.php');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
}
