import http from 'k6/http';
import { check, group } from 'k6';

let tcSessionCookie;

export function login({ email, password }) {
	group('Login', () => {
		const url = `${__ENV.BASE_URL}/v1/auth/login`;
		const payload = JSON.stringify({
			email,
			password,
			'g-recaptcha-response': 'recaptcha_some_token',
			fingerprint: 'qwerty',
			remember: false,
		});
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
			},
		};

		const response = http.post(url, payload, params);
		check(response, {
			'status code 200': r => r.status === 200,
		});
		const body = JSON.parse(response.body);
		tcSessionCookie = `${body['token_type'] || 'Bearer'} ${body['access_token']}`;
	});
}

export { tcSessionCookie };
