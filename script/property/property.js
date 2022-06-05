import http from 'k6/http';
import { check, group } from 'k6';
import { tcSessionCookie } from '../signup/signup.js';

export function createProperty(property) {
	group('Create property', () => {
		const url = `${__ENV.BASE_URL}/v1/landlord/property`;
		const payload = JSON.stringify({
			name: property.name,
			address1: '1469 Lexington Ave',
			city: 'Ashland',
			country: 'US',
			zip: '41101',
			state: 'KY',
			currency: 'USD',
			type: 1,
			year: property.year,
			unit_single: {
				price: property.price,
				bathrooms: property.bathrooms,
				bedrooms: property.bedrooms,
				size: property.size,
			},
		});

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
