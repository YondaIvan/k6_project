import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

let tcSessionCookie, confirmationCode;

export function signup({ email = `${randomString(9)}@gmail.com` } = {}) {
	console.log('\x1b[31m', email);
	group('Signup', () => {
		const url = `${__ENV.BASE_URL}/v1/auth/signup`;
		const payload = JSON.stringify({
			email,
			firstName: 'fffffff',
			lastName: 'ssssss',
			password: 'Qwerty123',
			password_confirmation: 'Qwerty123',
			time_zone: 'Europe/Kiev',
			fingerprint: '019db725-d37e-42ae-9457-db496b0f18d0',
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
	});

	group('Get confirmation code', () => {
		const url = `${__ENV.MAIL_URL}/api/v2/search?kind=to&query=${email}`;
		const params = {
			headers: {
				'Content-Type': 'application/json',
				'TC-CAPTCHA-TOKEN': 'tc_recaptcha_disable_token',
				'User-Agent': 'k6_test',
			},
		};
		sleep(5);
		const response = http.get(url, params);
		const mailText = JSON.stringify(JSON.parse(response.body).items[0]['Content']['Body']);
		const matched = mailText.match(/(?<=paste the code)(.*>)(\d{6})/);
		confirmationCode = matched[2];
		check(response, {
			'status code 200': r => r.status === 200,
		});
	});

	group('Send confirmation', () => {
		const url = `${__ENV.BASE_URL}/v1/auth/verify`;
		const payload = JSON.stringify({
			email,
			confirmation_code: confirmationCode,
			is_complete: true,
			fingerprint: '019db725-d37e-42ae-9457-db496b0f18d0',
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
