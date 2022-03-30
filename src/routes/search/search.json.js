// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
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
