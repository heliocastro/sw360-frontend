/* Copyright (c) 2022 Helio Chissini de Castro

   This program and the accompanying materials are made
   available under the terms of the Eclipse Public License 2.0
   which is available at https://www.eclipse.org/legal/epl-2.0/

   SPDX-License-Identifier: EPL-2.0 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function POST(endpoint: string, data: unknown) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data || {})
	}).then((r) => r.json());
}

export function sw360id(sw360Entity: any) {
	// eslint-disable-next-line no-prototype-builtins
	if (sw360Entity.hasOwnProperty('_links')) {
		const links = sw360Entity._links;
		// eslint-disable-next-line no-prototype-builtins
		if (links.hasOwnProperty('self')) {
			return links.self.href.split('/').pop();
		}
	}
	return ""
}

export function sw360idByUrl(sw360link: string) {
	return sw360link.split('/').pop();
}

