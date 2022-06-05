import http from 'k6/http';
import { check, group } from 'k6';
import { tcSessionCookie } from "../signup/signup.js";

export function createClient(client) {
	group('Create client', () => {
		const url = `${__ENV.BASE_URL}/v1/landlord/${client.role}`;
		const payload = JSON.stringify(client);

		const params = {
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'protractor_tests',
				authorization: tcSessionCookie,
			},
		};

		const response = http.post(url, payload, params);
		check(response, {
			'status code 201': r => r.status === 201,
		});
	});
}
