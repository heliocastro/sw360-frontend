// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
import * as api from '$lib/api';
import { sw360id } from '$lib/utils';

export async function GET({ params, locals }) {
	const endpoint = `components/${params.slug}`;

	const component = await api.GET(endpoint, locals.user && locals.user.access_token);
	const id = sw360id(component)

	// Fetch releases
	const searchParams = new URLSearchParams({'mainline-id-component': id})
	const releases = await api.GET(`releases/searchByExternalIds?${searchParams}`, locals.user && locals.user.access_token)
	const changelog = await api.GET(`changelog/document/${id}`, locals.user && locals.user.access_token)

	console.log(changelog._embedded['sw360:changeLogs'])

	if (component)
		return {
			headers: {
				'cache-control': 'public, max-age=300'
			},
			body: {
				component: component,
				releases: releases,
				changelog: changelog._embedded['sw360:changeLogs']
			}
		};

	return {
		status: 404
	};
}
