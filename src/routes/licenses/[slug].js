import * as api from '$lib/api';

export async function get({ params, locals }) {
	const endpoint = `licenses/${params.slug}`;

	const license = await api.get(endpoint, locals.user && locals.user.user.access_token);

	if (license)
		return {
			headers: {
				'cache-control': 'public, max-age=300'
			},
			body: {
				license: license
			}
		};

	return {
		status: 404
	};
}
