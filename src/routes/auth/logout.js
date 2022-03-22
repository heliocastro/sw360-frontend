export function post() {
	return {
		headers: {
			'set-cookie': 'sw360jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		},
		body: {
			ok: true
		}
	};
}
