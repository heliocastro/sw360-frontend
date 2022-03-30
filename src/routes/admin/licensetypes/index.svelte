
<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
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
	import QuickFilter from '$lib/components/QuickFilter.svelte';
	import Grid from 'gridjs-svelte';

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

<div class="sw360-gridpanel">
	<QuickFilter searchFunction={doSearch} />

	<div class="sw360-gridpanel-content-r">
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
