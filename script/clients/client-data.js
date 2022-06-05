export function generateTenantClient(index) {
	return {
		role: 'tenants',
		firstName: `tenant_${index}`,
		lastName: 'test_yonda',
		email: `tenant_${index}@gmail.com`,
	};
}

export function generateProfessionalClient(index) {
	return {
		role: 'professionals',
		firstName: `professional_${index}`,
		lastName: 'test_yonda',
		email: `professional_${index}@gmail.com`,
		category: 174,
		tax: { identity_type: 'ssn' },
	};
}
