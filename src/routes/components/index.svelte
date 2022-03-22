<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const components = await Promise.all([
			fetch(`/components/components.json${url.search}`, { credentials: 'include' }).then((r) =>
				r.json()
			)
		]);

		return {
			props: {
				components
			}
		};
	}
</script>

<script>
	import AdvancedSearch from '$lib/components/AdvancedSearch.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';

	export let components;

	const search_items = [
		{ title: 'Component Name', type: 'textedit', id: 'component_name' },
		{ title: 'Categories', type: 'textedit', id: 'categories' },
		{
			title: 'Component Type',
			type: 'listbox',
			id: 'component_type',
			value: ['OSS', 'COTS', 'Internal', 'Innes Source', 'Service', 'Freeware', 'Code Snippet']
		},
		{ title: 'Languages', type: 'textedit', id: 'languages' },
		{ title: 'Software Platforms', type: 'textedit', id: 'software_platforms' },
		{ title: 'Operating Systems', type: 'textedit', id: 'operating_systems' },
		{ title: 'Vendors', type: 'textedit', id: 'vendors' },
		{ title: 'Main licenses', type: 'textedit', id: 'main_licenses' },
		{ title: 'Created by (Email)', type: 'textedit', id: 'email' }
	];

	const columns = [
		{
			name: 'Vendor',
			formatter: (cell) => html(`<span class="font-bold text-red-900">${cell}</span>`)
		},
		{
			name: 'Component name',
			formatter: (cell) => html(`<a href='/component/${cell}'>${cell}</a>`)
		},
		{
			name: 'Main licenses',
			formatter: (cell) => html(`<span class="font-bold text-red-900">${cell}</span>`)
		},
		'Component type',
		'Actions'
	];

	const data = new Array();
	for (const value of components[0].components) {
		data.push([
			'NOT SUPPORTED DIRECT BY REST API',
			value.name,
			'NOT SUPPORTED DIRECT BY REST API',
			value.componentType
		]);
	}

	const total = data.length;
</script>

<PageHeader child="User">Admin</PageHeader>

<div class="grid-container grid grid-cols-6 px-16 pt-4 pb-8">
	<div><AdvancedSearch items={search_items} /></div>

	<div class="col-span-5">
		<div class="grid grid-cols-2 pb-6 justify-self-start">
			<div><button class="sw360-button">Add Component</button></div>
			<div class="text-right text-2xl text-sw360-grey uppercase">USERS: ({total})</div>
		</div>

		<div class="col-span">
			<Grid {data} {columns} sort pagination={{ enabled: true }} />
		</div>
	</div>
</div>
