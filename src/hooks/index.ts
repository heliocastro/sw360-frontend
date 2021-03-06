// Copyright (c) 2022 Helio Chissini de Castro

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0

import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const sw360jwt = cookies.sw360jwt && Buffer.from(cookies.sw360jwt, 'base64').toString('utf-8');
    event.locals.user = sw360jwt ? JSON.parse(sw360jwt) : null;
    return await resolve(event);
}

export function getSession({ locals }) {
    if(locals.user)
         return {
             user: {
				access_token: locals.user.access_token,
				token_type: locals.user.bearer,
				refresh_token: locals.user.refresh_token,
                jti: locals.user.jti,
                scope: locals.user.scope
             }
		};
    else {
        return {};
    }
}
