import { redirect } from "@sveltejs/kit";

export const load = () => {
    // if (!session.user) {
        throw redirect(302, '/login');
    // }
    // return {};
}

