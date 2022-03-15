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

<svelte:head>
	<title>SW360</title>
</svelte:head>
