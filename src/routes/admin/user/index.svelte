<script context="module">
	export const prerender = true;

	export async function load({ url, fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const userlist = await Promise.all([
			fetch(`/admin/user/userlist.json${url.search}`, { credentials: 'include' }).then((r) =>
				r.json()
			)
		]);

		return {
			props: {
				userlist
			}
		};
	}
</script>

<script>
	import AdvancedSearch from './AdvancedSearch.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';

	export let userlist;

	const columns = [
		'Given name',
		'Last name',
		{
			name: 'Email',
			formatter: (cell) => html(`<a href='/admin/user/${cell}'>${cell}</a>`)
		},
		'Primary Department',
		'Primary Department Role',
		'Secondary Department Role',
		'Actions'
	];

	const data = new Array();

	for (const value of userlist[0].userlist) {
		data.push([
			value.givenName,
			value.lastName,
			value.email,
			value.department,
			value.userGroup,
			'',
			''
		]);
	}

	const total = data.length;
</script>

<PageHeader child="User">Admin</PageHeader>

<div class="grid-container grid grid-cols-6 px-16 pt-4 pb-8">
	<div><AdvancedSearch /></div>

	<div class="col-span-5">
		<div class="grid grid-cols-2 pb-6 justify-self-start">
			<div><button class="sw360-button">Add User</button></div>
			<div class="text-right text-2xl text-sw360-grey uppercase">USERS: ({total})</div>
		</div>

		<div class="sw360-navy-text">sw360 users</div>
		<div class="col-span">
			<Grid {data} {columns} sort pagination={{ enabled: true }} />
		</div>
	</div>
</div>
