import * as api from '$lib/api';

export async function get({url: { searchParams }, locals, request}) {

	console.log('---------------- ENDPOINTS -------------');
	console.log(request.headers);
	console.log('---------------- ENDPOINTS -------------');

	let endpoint = request.headers.get("endpoint");

	const data = await api.get(
		`${endpoint}?${searchParams}`, locals.user && locals.user.access_token
	);

	return {
		headers: {
			'cache-control': 'public, max-age=300'
		},
		body: data.hasOwnProperty('_embedded') ? data._embedded[`sw360:${endpoint}`] : data
	};
}
