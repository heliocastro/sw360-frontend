import * as api from '$lib/api';

export async function get({ url: { searchParams }, locals }) {
	const endpoint = 'components';

	const components = await api.get(`${endpoint}`, locals.user && locals.user.user.access_token);

	return {
		headers: {
			'cache-control': 'public, max-age=300'
		},
		body: {
			components: components._embedded.hasOwnProperty('sw360:components') ? components._embedded['sw360:components'] : components
		}
	};
}
