import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 2,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<400', 'p(99)<500', 'max<500'],
    http_req_failed: ['rate<0.01'],
    http_reqs: ['count>10'],
    vus: ['value>1'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
  check(res, { 'Status is 200': (r) => r.status === 200,
    'Page is QuickPizza Legacy': (r) => r.body?.toString().includes('QuickPizza Legacy') ?? false});
  sleep(1);
  res = http.get('https://quickpizza.grafana.com/contacts.php');
  check(res, { 'Status is 200': (r) => r.status === 200});
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/pi.php?decimals=3');
  check(res, { 'Status is 200': (r) => r.status === 200});
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/flip_coin.php');
  check(res, { 'Status is 200': (r) => r.status === 200 });
  sleep(1)
  res = http.get('https://quickpizza.grafana.com/browser.php');
  check(res, { 'Status is 200': (r) => r.status === 200 });
  sleep(1)
}
