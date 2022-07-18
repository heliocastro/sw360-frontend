// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
import * as api from '$lib/api';

export async function GET({ params, locals }) {
	const endpoint = `users/${params.slug}`;

	const sw360user = await api.GET(endpoint, locals.user && locals.user.access_token);

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
