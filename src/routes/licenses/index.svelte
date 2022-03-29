<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const dataheaders = new Headers({ Endpoint: 'licenses' });
		const licenses = await Promise.all([
			fetch(`/data/data.json${url.search}`, { credentials: 'include', headers: dataheaders }).then(
				(r) => r.json()
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
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import QuickFilter from '$lib/components/QuickFilter.svelte';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';

	const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);

	export let licenses;
	let name = 'Licenses';
	const data = new Array();
	let licensegrid;
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

	for (const value of licenses[0]) {
		const url = new URL(value._links.self.href);
		data.push([getLastItem(url.pathname), value.fullName, value.checked, 'NADA']);
	}
	const total = data.length;

	async function doSearch() {
		search.keyword = this.value;
		licensegrid.updateConfig({ search }).forceRender();
	}

	async function doLimit() {
		pagination.limit = this.value;
		grid.updateConfig({ pagination }).forceRender();
	}
</script>

<PageHeader {name} />

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<QuickFilter searchFunction={doSearch} />

	<div class="col-span-5 grid grid-cols-2">
		<ComponentHeader {name} {total}>
			<button class="sw360-button">Add License</button>
		</ComponentHeader>
		<div class="my-4 text-base text-gray-600">
			Show <span>
				<select on:change={doLimit} class="bg-white rounded border p-1">
					<option selected>10</option><option>25</option><option>50</option><option>100</option>
				</select>
			</span>entries
		</div>
		<div class="col-span-2">
			<Grid bind:instance={licensegrid} {data} {columns} sort {search} {pagination} />
		</div>
	</div>
</div>
