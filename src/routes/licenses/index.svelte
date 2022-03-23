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
	import PageHeader from '$lib/components/PageHeader.svelte';

	const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);

	export let licenses;

	const columns = [
		{
			name: 'Shortname',
			formatter: (cell) => html(`<a href='/licenses/${cell}'>${cell}</a>`)
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

<PageHeader>Licenses</PageHeader>

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<div class="rounded border h-1/5">
		<div class="sw360-navy-header">Quick Filter</div>

		<div class="bg-sw360-paleblue flex h-24 justify-center items-center">
			<input
				class="shadow appearance-none border rounded-b w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="I'm not working yet"
				id="quickfilter"
				type="search"
			/>
		</div>
	</div>

	<div class="col-span-5 grid grid-cols-2">
		<div class="pb-6 justify-self-start">
			<button class="sw360-button">Add License</button>
		</div>
		<div class="text-right text-2xl text-sw360-grey">LICENSES: ({totallic})</div>
		<div class="col-span-2">
			<div></div>
			<Grid {data} {columns} sort search pagination={{ enabled: true }} />
		</div>
	</div>
</div>
