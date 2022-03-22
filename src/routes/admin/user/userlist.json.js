import * as api from '$lib/api';

export async function get({ url: { searchParams }, locals }) {
	const endpoint = 'users';

	const users = await api.get(`${endpoint}`, locals.user && locals.user.user.access_token);
	const userlist = new Array();

	if(users) {
		for(value of users._embedded['sw360:users']) {
			const user = await api.get(`${endpoint}/${value.email}`, locals.user && locals.user.user.access_token);
			if(user) {
				userlist.push(user)
			}
		}
	}

	return {
		headers: {
			'cache-control': 'public, max-age=300'
		},
		body: {
			userlist: userlist
		}
	};
}
