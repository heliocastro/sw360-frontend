<script context="module">
	export const prerender = true;

	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as api from '$lib/api';

	export async function get({ url: { searchParams }, locals }) {
		const endpoint = 'licenses';

		const licenses = await api.get(`${endpoint}`, locals.user && locals.user.access_token);

		return {
			headers: {
				'cache-control': 'public, max-age=300'
			},
			body: {
				licenses: licenses
			}
		};
	}
</script>

<PageHeader>Home</PageHeader>
