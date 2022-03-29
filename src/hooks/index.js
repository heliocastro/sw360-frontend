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
                jti: locals.user.jti
             }
		};
    else {
        return {};
    }
}
