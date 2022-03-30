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
	let pagination = {
		limit: 10
	};
	let search = {
		keyword: ''
	};
	let grid;

	const columns = [
		{
			name: 'License Shortname',
			formatter: (cell) => html(`<a href='/licenses/${cell}'>${cell}</a>`),
			width: '20%'
		},
		{
			name: 'License Fullname',
			width: '60%'
		},

		{
			name: 'Is Checked',
			width: '10%',
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
		data.push([getLastItem(url.pathname), value.fullName, value.checked, '--']);
	}
	const total = data.length;

	async function doSearch() {
		search.keyword = this.value;
		grid.updateConfig({ search }).forceRender();
	}

	async function doLimit() {
		pagination.limit = this.value;
		grid.updateConfig({ pagination }).forceRender();
	}
</script>

<PageHeader {name} />

<div class="sw360-gridpanel">
	<QuickFilter searchFunction={doSearch} />

	<div class="sw360-gridpanel-content-r">
		<ComponentHeader {name} {total}>
			<button class="sw360-button">Add License</button>
		</ComponentHeader>
		<div class="col-span-2">
			<div class="my-4 text-base text-gray-600">
				Show <span>
					<select on:change={doLimit} class="bg-white rounded border p-1">
						<option selected>10</option><option>25</option><option>50</option><option>100</option>
					</select>
				</span>entries
			</div>
			<Grid bind:instance={grid} {data} {columns} sort {search} {pagination} />
		</div>
	</div>
</div>
