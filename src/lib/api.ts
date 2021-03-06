// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0

import { SW360_API_URL } from './env';

const base = SW360_API_URL + '/resource/api';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts['body']= JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function GET(path: string, token: string) {
	return send({ method: 'GET', path, token, data: null });
}

export function DEL(path: string, token: string) {
	return send({ method: 'DELETE', path, token, data: null });
}

export function POST(path: string, data: Object, token: string) {
	return send({ method: 'POST', path, data, token });
}

export function PUT(path: string, data, token: string) {
	return send({ method: 'PUT', path, data, token });
}
