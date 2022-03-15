import * as api from '$lib/api';
import { session } from '$app/stores';

export async function get({url: { searchParams }, locals}) {
	const endpoint ='licenses';

	const licenses = await api.get(
		`${endpoint}`, locals.user && locals.user.user.access_token
	);

	return {
		headers: {
			'cache-control': 'public, max-age=300'
		},
		body: {
			licenses: licenses
		}
	};
}
