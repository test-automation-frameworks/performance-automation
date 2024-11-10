import http from 'k6/http';
import { check, sleep } from 'k6';
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export let options = {
	stages: [
		{ duration: '10s', target: 10 }, // Stage 1: Peak Load – 10 requests (at server capacity)
		{ duration: '10s', target: 20 }, // Stage 2: Increase to 20 users
		{ duration: '10s', target: 30 }, // Stage 3: Then increase to 30 users
		{ duration: '10s', target: 40 }, // Stage 4: Keep increasing until failure
		{ duration: '1m', target: 100 }, // Stage 4: Spike load
	],
};

export default function () {
	describe('client_registration: stress test with { duration: 10s, target: 10vus }', () => {
		client_register();
	});

	describe('client_registration: stress test with { duration: 10s, target: 20vus }', () => {
		client_register();
	});

	describe('client_registration: stress test with { duration: 10s, target: 30vus }', () => {
		client_register();
	});

	describe('client_registration: stress test with { duration: 10s, target: 40vus }', () => {
		client_register();
	});

	describe('client_registration: stress test with { duration: 1m, target: 100vus }', () => {
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
		'reports/client_registration.stress.test.html': htmlReport(data),
	};
}
