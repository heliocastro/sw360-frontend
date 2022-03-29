<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		let headers = new Headers({ Endpoint: 'projects' });
		url.search = new URLSearchParams({ allDetails: true }).toString();
		const projects = await Promise.all([
			fetch(`/data/data.json${url.search}`, { credentials: 'include', headers: headers }).then(
				(r) => r.json()
			)
		]);

		return {
			props: {
				projects
			}
		};
	}
</script>

<script>
	import AdvancedSearch from '$lib/components/AdvancedSearch.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';

	export let projects;
	let name = 'Projects';
	let grid;
	let pagination = {
		limit: 10
	};

	const search_items = [
		{ title: 'Project Name', type: 'textedit', id: 'project_name' },
		{ title: 'Project Version', type: 'textedit', id: 'categories' },
		{
			title: 'Project Type',
			type: 'listbox',
			id: 'project_type',
			value: ['Customer Project', 'Internal Project', 'Product', 'Service', 'Inner Source']
		},
		{ title: 'Project Responsible (Email)', type: 'textedit', id: 'project_responsible' },
		{ title: 'Group', type: 'listbox', id: 'group' },
		{ title: 'State', type: 'listbox', id: 'state', value: ['Active', 'Phaseout', 'Unknown'] },
		{
			title: 'Clearing State',
			type: 'listbox',
			id: 'clearing_state',
			value: ['Open', 'In Progress', 'Closed']
		},
		{ title: 'Tag', type: 'textedit', id: 'tag' },
		{ title: 'Additional Data', type: 'textedit', id: 'additional_data' }
	];

	const columns = [
		{
			name: 'Project name',
			formatter: (cell) => html(`<a href='/component/${cell}'>${cell}</a>`)
		},
		'Description',
		{
			name: 'Project responsible',
			formatter: (cell) => html(`<a href='/component/${cell}'>${cell}</a>`)
		},
		{
			name: 'State',
			formatter: (cell) => html(`<a href='/component/${cell}'>${cell}</a>`)
		},
		'License Clearing',
		'Actions'
	];

	const data = new Array();
	for (const value of projects[0]) {
		data.push([
			`${value.name}(${value.version})`,
			value.description,
			value.projectResponsible,
			[value.state, value.clearingState]
		]);
	}
	const total = data.length;

	async function doLimit() {
		pagination.limit = this.value;
		grid.updateConfig({ pagination }).forceRender();
	}
</script>

<PageHeader {name} />

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<AdvancedSearch items={search_items} />
	<div class="col-span-5 grid grid-cols-2 content-start">
		<ComponentHeader {name} {total}>
			<button class="sw360-button">Add Vendor</button>
			<button class="sw360-button-reverse">Import SPDX BOM</button>
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
			<Grid bind:instance={grid} {data} {columns} sort {pagination} />
		</div>
	</div>
</div>
