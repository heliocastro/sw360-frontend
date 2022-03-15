export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data || {})
	}).then((r) => r.json());
}
