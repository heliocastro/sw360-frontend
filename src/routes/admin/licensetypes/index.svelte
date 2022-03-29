<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		// url.search = new URLSearchParams({ endpoint: 'vendors' }).toString();
		// const vendors = await Promise.all([
		// 	fetch(`/data/data.json${url.search}`, { credentials: 'include' }).then((r) => r.json())
		// ]);

		return {
			props: {
				//vendors
			}
		};
	}
</script>

<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import QuickFilter from '$lib/components/QuickFilter.svelte';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	const name = 'License Types';
	const parent = 'Admin';
	let total = 0;
	const data = new Array();
	let grid;

	let pagination = {
		limit: 10
	};
	let search = {
		keyword: ''
	};

	const columns = ['License Type', 'Actions'];

	// if (lictypes.data) {
	// 	for (const value of vendors[0].vendors._embedded['sw360:vendors']) {
	// 		const url = new URL(value._links.self.href);
	// 		data.push(value.fullName, value.shortName, value.url);
	// 	}
	// }
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
		<div class="flex gap-2">
			<button class="sw360-button">Add License Type</button>
		</div>
		<div class="text-right text-2xl text-sw360-grey place-self-end uppercase">
			License Types: ({total})
		</div>

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
