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
	import CellIcon from '$lib/components/CellIcon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';

	const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);

	export let licenses;
	let totallic = 0;
	const data = new Array();
	let grid;
	let pagination = {
		limit: 10
	};
	let search = {
		keyword: ''
	};

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

	for (const value of licenses[0].licenses._embedded['sw360:licenses']) {
		const url = new URL(value._links.self.href);
		data.push([getLastItem(url.pathname), value.fullName, value.checked, 'NADA']);
	}
	totallic = data.length;

	async function doSearch() {
		search.keyword = this.value;
		grid.updateConfig({ search }).forceRender();
	}

	async function doLimit() {
		pagination.limit = this.value;
		grid.updateConfig({ pagination }).forceRender();
	}
</script>

<PageHeader>Licenses</PageHeader>

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<div class="rounded">
		<div class="sw360-navy-header">Quick Filter</div>

		<div class="bg-sw360-paleblue flex h-24 justify-center items-center">
			<input
				class="shadow appearance-none border rounded-b w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="quickfilter"
				type="search"
				on:keyup={doSearch}
			/>
		</div>
	</div>

	<div class="col-span-5 grid grid-cols-2">
		<div class="pb-6 justify-self-start">
			<button class="sw360-button">Add License</button>
		</div>
		<div class="text-right text-2xl text-sw360-grey">LICENSES: ({totallic})</div>
		<div class="my-4 text-base text-gray-600">
			Show <span>
				<select on:change={doLimit} class="bg-white rounded border p-1">
					<option selected>10</option><option>25</option><option>50</option><option>100</option>
				</select>
			</span>entries
		</div>
		<div class="col-span-2">
			<Grid bind:instance={grid} {data} {columns} sort {search} {pagination} />
		</div>
	</div>
</div>
