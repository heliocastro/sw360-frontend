<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		url.search = new URLSearchParams({ endpoint: 'vendors' }).toString();
		const vendors = await Promise.all([
			fetch(`/data/data.json${url.search}`, { credentials: 'include' }).then((r) => r.json())
		]);

		return {
			props: {
				vendors
			}
		};
	}
</script>

<script>
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import QuickFilter from '$lib/components/QuickFilter.svelte';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	export let vendors;
	let total = 0;
	const data = new Array();
	let grid;
	let name = 'Vendors';
	let parent = 'Admin';

	let pagination = {
		limit: 10
	};
	let search = {
		keyword: ''
	};

	const columns = [
		'Full Name',
		'Short Name',
		{
			name: 'URL',
			formatter: (cell) => html(`<a href='/licenses/${cell}'>${cell}</a>`)
		},
		'Actions'
	];

	for (const value of vendors) {
		if (value.hasOwnProperty('fullName')) {
			const url = new URL(value._links.self.href);
			data.push(value.fullName, value.shortName, url);
		}
	}
	total = data.length;

	async function doSearch() {
		search.keyword = this.value;
		grid.updateConfig({ search }).forceRender();
	}

	async function doLimit() {
		pagination.limit = this.value;
		grid.updateConfig({ pagination }).forceRender();
	}
</script>

<PageHeader {name} {parent} />

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<QuickFilter searchFunction={doSearch} />

	<div class="col-span-5 grid grid-cols-2">
		<ComponentHeader {name} {total}>
			<button class="sw360-button">Add Vendor</button>
			<button class="sw360-button-reverse">Export Spreadsheet</button>
		</ComponentHeader>
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
