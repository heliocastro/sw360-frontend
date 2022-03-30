// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
import { respond } from './_respond';
import { SW360_API_URL } from '$lib/env';

export async function post({ request }) {
	const userdata = await request.json();

	var url = new URL(SW360_API_URL + '/authorization/client-management');
	var credentials = Buffer.from(`${userdata.email}:${userdata.password}`, 'binary').toString(
		'base64'
	);
	var opts = { method: 'GET', headers: {} };

	opts.headers['Content-Type'] = 'application/json';
	opts.headers['Authorization'] = `Basic ${credentials}`;

	const baseauth = await fetch(url, opts)
		.then((response) => response.text())
		.then((json) => {
			try {
				secrets = JSON.parse(json)[0];
			} catch (err) {
				secrets = json;
			}
		});
	client_id = secrets.client_id;
	client_secret = secrets.client_secret;

	credentials = Buffer.from(`${secrets.client_id}:${secrets.client_secret}`, `binary`).toString(
		'base64'
	);
	opts.headers['Authorization'] = `Basic ${credentials}`;
	url = new URL(SW360_API_URL + '/authorization/oauth/token');
	var params = { grant_type: 'password', username: userdata.email, password: userdata.password };
	url.search = new URLSearchParams(params).toString();

	const body = await fetch(url, opts)
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
