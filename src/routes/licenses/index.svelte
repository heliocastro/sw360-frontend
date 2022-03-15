<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const licenses = await Promise.all([
			fetch(`/licenses/licenses.json${url.search}`, { credentials: 'include' }).then((r) =>
				r.json()
			)
		]);

		return {
			props: {
				licenses
			}
		};
	}
</script>

<script>
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';
	import CellIcon from '$lib/components/CellIcon.svelte';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';
	import Button from '$lib/components/Button.svelte';

	const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);

	export let licenses;

	const columns = [
		{
			name: 'Shortname',
			formatter: (cell) => html(`<a href='/licenses/${cell}'>${cell}</a>`)
			// plugin: {
			// 	component: SvelteWrapper,
			// 	props: {
			// 		component: CellLink
			// 	}
			// }
		},
		'License Fullname',
		{
			name: 'Is Checked',
			plugin: {
				component: SvelteWrapper,
				props: {
					component: CellIcon
				}
			}
		},
		'License Type'
	];

	const data = new Array();

	for (const value of licenses[0].licenses._embedded['sw360:licenses']) {
		const url = new URL(value._links.self.href);
		data.push([getLastItem(url.pathname), value.fullName, value.checked, 'NADA']);
	}
	const totallic = data.length;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="grid grid-cols-2 gap-4 p-8">
	<div>
		<Button label="Add License" />
	</div>
	<div class="text-right text-2xl text-sw360-gray">LICENSES: ({totallic})</div>
	<div class="col-span-2">
		<Grid {data} {columns} sort search pagination={{ enabled: true }} />
	</div>
</div>
