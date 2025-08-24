import http from 'k6/http';
import { check, group } from 'k6';
import { Trend } from 'k6/metrics';

let contactPageResponseTime = new Trend('contact_page_response_time');

export let options = {
  vus: 2,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<400', 'p(99)<500', 'max<500'], // This is custom tag
    'http_req_duration{page: homepage}': ['p(95)<400', 'p(99)<500', 'max<500'],
    'http_req_duration{page: contactpage}': ['p(95)<400', 'p(99)<500', 'max<500'],
    'http_req_duration{page: pi}': ['p(95)<400', 'p(99)<500', 'max<500'],
    'http_req_duration{page: flip_coin}': ['p(95)<400', 'p(99)<500', 'max<500'],
    'http_req_duration{page: browser}': ['p(95)<400', 'p(99)<500', 'max<500'],
    http_req_failed: ['rate<0.01'],
    'http_req_failed{page: contactpage}': ['rate<0.01'],
    'http_req_failed{page: pi}': ['rate<0.01'],
    'http_req_failed{page: flip_coin}': ['rate<0.01'],
    'http_req_failed{page: browser}': ['rate<0.01'],
    http_reqs: ['count>10'],
    vus: ['value>1'],
    checks: ['rate>0.99'],
    'checks{page: contactpage}': ['rate>0.99'],
    'checks{page: pi}': ['rate>0.99'],
    'checks{page: flip_coin}': ['rate>0.99'],
    'checks{page: browser}': ['rate>0.99'],
    contact_page_response_time: ['p(95)<400', 'p(99)<450', 'max<500'], // defining custom metrics for contact page response time
    'group_duration{group:::Home Page}': ['p(95)<400', 'p(99)<450', 'max<500'], // This is group specific thresholds
    'group_duration{group:::Contact Page}': ['p(95)<400', 'p(99)<450', 'max<500'],
    'group_duration{group:::Pi Page}': ['p(95)<400', 'p(99)<450', 'max<500'],
    'group_duration{group:::Flip Coin Page}': ['p(95)<400', 'p(99)<450', 'max<500'],
    'group_duration{group:::Browser Page}': ['p(95)<400', 'p(99)<450', 'max<500'],
  },
};

export default function () {
  group('Home Page', function () { // This is defining homepage group and can contain multiple requests which can be grouped together
    let res = http.get('https://quickpizza.grafana.com/test.k6.io/', {tags: {page: 'homepage'}}); // This is custom tag
    check(res, { 'Status is 200': (r) => r.status === 200,
      'Page is QuickPizza Legacy': (r) => r.body?.toString().includes('QuickPizza Legacy') ?? false }, { page: 'homepage' });
  });
  group('Contact Page', function () { // This is defining contact page group and can contain multiple requests which can be grouped together
    let res = http.get('https://quickpizza.grafana.com/contacts.php', {tags: {page: 'contactpage'}});
  check(res, { 'Status is 200': (r) => r.status === 200}, { page: 'contactpage' });
  contactPageResponseTime.add(res.timings.duration,{ page: 'contactpage' }); // Adding custom metrics for contact page response time
  });
  group('Pi Page', function () { // This is defining pi page group and can contain multiple requests which can be grouped together
    let res = http.get('https://quickpizza.grafana.com/pi.php?decimals=3', {tags: {page: 'pi'}});
  check(res, { 'Status is 200': (r) => r.status === 200}, { page: 'pi' });
  });
  group('Flip Coin Page', function () { // This is defining flip coin page group and can contain multiple requests which can be grouped together
    let res = http.get('https://quickpizza.grafana.com/flip_coin.php', {tags: {page: 'flip_coin'}});
  check(res, { 'Status is 200': (r) => r.status === 200 }, { page: 'flip_coin' });
  });
  group('Browser Page', function () { // This is defining browser page group and can contain multiple requests which can be grouped together
    let res = http.get('https://quickpizza.grafana.com/browser.php', {tags: {page: 'browser'}});
    check(res, { 'Status is 200': (r) => r.status === 200 }, { page: 'browser' });
  });
}
