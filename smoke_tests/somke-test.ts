import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '60s',
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
