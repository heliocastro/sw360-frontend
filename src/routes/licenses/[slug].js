// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
import * as api from '$lib/api';

export async function get({ params, locals }) {
	const endpoint = `licenses/${params.slug}`;

	const license = await api.get(endpoint, locals.user && locals.user.access_token);

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
