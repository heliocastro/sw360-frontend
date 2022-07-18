// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
import { respond } from './_respond';
import { SW360_API_URL } from '$lib/env';

export async function POST({ request }) {
	const userdata = await request.json();

	let url: URL = new URL(SW360_API_URL + '/authorization/client-management');
	let credentials: string = Buffer.from(`${userdata.email}:${userdata.password}`, 'binary').toString(
		'base64'
	);
	const opts = { method: 'GET', headers: {} };

	opts.headers['Content-Type'] = 'application/json';
	opts.headers['Authorization'] = `Basic ${credentials}`;

	let secrets = null;

	await fetch(url.toString(), opts)
		.then((response) => response.text())
		.then((json) => {
			try {
				secrets = JSON.parse(json)[0];
			} catch (err) {
				secrets = json;
			}
		});

	credentials = Buffer.from(`${secrets.client_id}:${secrets.client_secret}`, `binary`).toString(
		'base64'
	);
	opts.headers['Authorization'] = `Basic ${credentials}`;
	url = new URL(SW360_API_URL + '/authorization/oauth/token');
	const params = { grant_type: 'password', username: userdata.email, password: userdata.password };
	url.search = new URLSearchParams(params).toString();

	let sw360token: JSON | string = null
	await fetch(url.toString(), opts)
		.then((response) => response.text())
		.then((json) => {
			try {
				sw360token = JSON.parse(json);
			} catch (err) {
				sw360token = json;
			}
		});

	return respond(sw360token);
}
