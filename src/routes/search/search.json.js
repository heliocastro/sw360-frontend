import * as api from '$lib/api';

export async function get({ url: { searchParams }, locals }) {
	const endpoint = 'search';

	const search_result = await api.get(
		`${endpoint}?${searchParams}`,
		locals.user && locals.user.access_token
	);

	return {
		headers: {
			'cache-control': 'public, max-age=300'
		},
		body: {
			result: search_result ? search_result._embedded['sw360:searchResults'] : search_result
		}
	};
}
