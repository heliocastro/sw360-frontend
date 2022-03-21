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
</script>

<PageHeader>Home</PageHeader>
