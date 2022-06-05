import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { tcSessionCookie } from '../signup/signup.js';

export function onboarding() {
	group('Get onboarding role', () => {
		const url = `${__ENV.BASE_URL}/v1/auth/role`;
		const payload = JSON.stringify({ role: 'admin' });
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
				authorization: tcSessionCookie,
			},
		};

		const response = http.post(url, payload, params);
		check(response, {
			'status code 201': r => r.status === 201,
		});
	});

	group('Get onboarding property', () => {
		const url = `${__ENV.BASE_URL}/v2/on_boarding/property`;
		const payload = JSON.stringify({
			type: 1,
			currency: 'USD',
			units: [],
			unit_single: { price: 32 },
			data: [],
			fullAddress: '123 William St, New York, NY 10038, USA',
			place_id: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
			address1: '123 William St',
			state: 'NY',
			county: 'New York',
			country: 'US',
			city: 'New York',
			zip: '10038',
			viewport_coordinates: [-74.0084042802915, 40.7079798197085, -74.00570631970848, 40.7106777802915],
		});
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
				authorization: tcSessionCookie,
			},
		};

		const response = http.post(url, payload, params);
		check(response, {
			'status code 201': r => r.status === 201,
		});
	});

	group('Update onboarding step 1', () => {
		const url = `${__ENV.BASE_URL}/v1/on_boarding`;
		const payload = JSON.stringify({ scenario: 'list_unit', step: 'listing' });
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
				authorization: tcSessionCookie,
			},
		};

		const response = http.put(url, payload, params);
		check(response, {
			'status code 200': r => r.status === 200,
		});
	});

	group('Update onboarding step 2', () => {
		const url = `${__ENV.BASE_URL}/v1/on_boarding`;
		const payload = JSON.stringify({ scenario: 'list_unit', step: 'choose_subscription', is_skipped: true });
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
				authorization: tcSessionCookie,
			},
		};

		const response = http.put(url, payload, params);
		check(response, {
			'status code 200': r => r.status === 200,
		});
	});

	group('Finish onboarding', () => {
		const url = `${__ENV.BASE_URL}/v1/on_boarding/finish`;
		const payload = JSON.stringify([]);
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
				authorization: tcSessionCookie,
			},
		};

		const response = http.put(url, payload, params);
		check(response, {
			'status code 200': r => r.status === 200,
		});
	});
}

export { tcSessionCookie };
