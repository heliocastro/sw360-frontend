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
	import AdvancedSearch from '$lib/components/AdvancedSearch.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Grid from 'gridjs-svelte';
	import { typecolor } from '$lib/settings';
	import { html } from 'gridjs';

	let multibinds = { selected: [], searchText: '' };
	let data = new Array();
	let grid;
	let total = 0;

	const keyword_items = [
		{ title: null, type: 'textedit', id: 'searchText' },
		{
			title: 'RESTRICT TO TYPE',
			type: 'checkbox',
			id: 'check_group',
			value: [
				{ id: 'project', label: 'Projects', color: typecolor.project },
				{ id: 'component', label: 'Components', color: typecolor.component },
				{ id: 'license', label: 'Licenses', color: typecolor.license },
				{ id: 'release', label: 'Releases', color: typecolor.release },
				{ id: 'obligation', label: 'Obligations', color: typecolor.obligation },
				{ id: 'user', label: 'Users', color: typecolor.user },
				{ id: 'vendor', label: 'Vendors', color: typecolor.vendor }
			]
		}
	];

	const columns = [
		{
			name: 'Type',
			formatter: (cell) =>
				html(
					`<span class="font-bold text-white ml-2 px-1.5 py-0.5 uppercase ${
						cell.color
					}">${cell.text.charAt(0)}</span>`
				)
		},
		{
			name: 'Text',
			formatter: (cell) => html(`<a href="${cell.url}">${cell.text}</a>`)
		}
	];

	let pagination = {
		limit: 10
	};

	async function doSearch() {
		let paramsObj = { searchText: multibinds.searchText ? multibinds.searchText : '*' };
		let typeMasks = [];

		data = [];

		if (multibinds.selected.length) paramsObj['typeMasks'] = multibinds.selected.join(',');

		let searchParams = new URLSearchParams(paramsObj);

		const result = await Promise.all([
			fetch(`/search/search.json?${searchParams}`, { credentials: 'include' }).then((r) => r.json())
		]);

		for (const value of result[0].result) {
			data.push([
				{ color: typecolor[value.type], text: value.type },
				{ url: `/${value.type}/${value.id}`, text: value.name }
			]);
		}

		total = data.length;

		grid.updateConfig({ data }).forceRender();
	}

	function updategrid() {
		grid.updateConfig({ data }).forceRender();
	}
</script>

<PageHeader>Search</PageHeader>

<div class="grid-container grid grid-cols-6 px-16 pt-4 pb-8">
	<div>
		<AdvancedSearch
			title="Keyword Search"
			items={keyword_items}
			buttonAction={doSearch}
			bind:multibinds
		/>
	</div>

	<div class="col-span-5">
		<div class="text-right text-2xl text-sw360-grey uppercase">SEARCH RESULTS: ({total})</div>
		<div class="my-4 text-base text-gray-600">
			Show <span>
				<select
					bind:value={pagination.limit}
					on:change={updategrid}
					class="bg-white rounded border p-1"
				>
					<option selected>10</option><option>25</option><option>50</option><option>100</option>
				</select>
			</span>entries
		</div>
		<div class="col-span">
			<Grid {data} {columns} bind:instance={grid} sort {pagination} />
		</div>
	</div>
</div>
