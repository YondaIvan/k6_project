import { LOCAL_ENV, STAGING_ENV } from './script/k6-environment.js';
import { createClient } from './script/clients/client.js';
import { createProperty } from './script/property/property.js';
import { generateProperty } from './script/property/property-data.js';
import { generateProfessionalClient, generateTenantClient } from './script/clients/client-data.js';
import { signup } from './script/signup/signup.js';
import { onboarding } from './script/onboarding/onboarding.js';

export const options = {
	scenarios: {
		local_scenario: {
			iterations: 5,
			vus: 3,
			executor: 'shared-iterations',
			startTime: '0s',
			env: LOCAL_ENV,
		},
		staging_scenario: {
			iterations: 1,
			vus: 1,
			executor: 'shared-iterations',
			startTime: '0s',
			env: STAGING_ENV,
		},
	},
};

export default function() {
	signup();
	onboarding();
	for (let i = 0; i < 2; i++) {
		createClient(generateTenantClient(i + 1));
	}
	for (let i = 0; i < 2; i++) {
		createClient(generateProfessionalClient(i + 1));
	}
	for (let i = 0; i < 2; i++) {
		createProperty(generateProperty(i + 1));
	}
}
