import * as api from '$lib/api';

export async function get({ params, locals }) {
	const endpoint = `users/${params.slug}`;

	const sw360user = await api.get(endpoint, locals.user && locals.user.access_token);

	if (sw360user)
		return {
			headers: {
				'cache-control': 'public, max-age=300'
			},
			body: {
				sw360user: sw360user
			}
		};

	return {
		status: 404
	};
}
