<script context="module" lang="ts">
	export const prerender = true;
	import { page, session } from '$app/stores';

	let isLogin = false;

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

<svelte:head>
	<title>SW360</title>
</svelte:head>

