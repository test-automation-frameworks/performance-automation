import http from 'k6/http';
import { check, sleep } from 'k6';
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export let options = {
	stages: [
		{ duration: '30s', target: 5 }, // Stage 1: Normal Load (5 requests (below server capacity) for a short period to simulate regular traffic.)
		{ duration: '1m', target: 10 }, // Stage 2: Peak Load – 10 requests (at server capacity) to evaluate performance at maximum concurrent load.
		{ duration: '2m', target: 10 }, // Stage 3: Sustained Load – 10 requests for a longer period to test server stability under continuous load.
		{ duration: '1m', target: 15 }, // Stage 4: Stress Load – 15-20 requests to test the server’s ability to handle overload conditions and identify the breaking point.
	],
};

export default function () {
	describe('client_registration: desire load test with { duration: 30s, target: 5vus } ', () => {
		client_register();
	});

	describe('client_registration: peak load test { duration: 1m, target: 10vus }', () => {
		client_register();
	});

	describe('client_registration: sustained load test { duration: 2m, target: 10vus }', () => {
		client_register();
	});

	describe('client_registration: burst load test { duration: 1m, target: 15vus }', () => {
		client_register();
	});
}

function client_register() {
	const formData = {
		fullName: 'John Doe',
		userName: 'johndoe123',
		email: `johndoe${Math.floor(Math.random() * 10000)}@example.com`,
		password: 'securepassword123',
		phone: '1234567890',
	};

	let res = http.post('http://127.0.0.1:5000/client_registeration', formData);

	check(res, {
		'is status 200': (r) => r.status === 200,
		'is user registered': (r) => r.json().msg === 'User Registered',
	});

	sleep(1);
}
export function handleSummary(data) {
	return {
		'reports/client_registration.load.test.html': htmlReport(data),
	};
}
