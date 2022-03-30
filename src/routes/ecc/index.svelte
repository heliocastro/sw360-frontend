<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: {}
		};
	}
</script>

<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	let name = 'ECC';
</script>

<PageHeader {name} />
