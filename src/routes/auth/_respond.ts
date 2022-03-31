// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}

	const json = JSON.stringify(body);
	const value = Buffer.from(json).toString('base64');

	return {
		headers: {
			'set-cookie': `sw360jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}
