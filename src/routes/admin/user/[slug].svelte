<script>
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import InfoCell from '$lib/components/InfoCell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	export let sw360user;
	let name = 'User';
	let parent = 'Admin';
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
	<div class="sw360-gridpanel-content-full text-gray-900">
		<ComponentHeader name={sw360user.email}>
			<button class="sw360-button">Edit User</button>
		</ComponentHeader>

		<div class="col-span-2">
			<div class="sw360-navy-bg-text">User Information</div>

			<InfoCell>
				<span>Given name:</span>
				<div class="col-span-2">{sw360user.givenName}</div>
			</InfoCell>
			<InfoCell>
				<span>Last name:</span>
				<div class="col-span-2">{sw360user.lastName}</div>
			</InfoCell>
			<InfoCell>
				<span>Email Id:</span>
				<div class="col-span-2">{sw360user.givenName}</div>
			</InfoCell>
			<InfoCell>
				<span>Global Identifier:</span>
				<div class="col-span-2 font-bold text-red-700 sw360-paleblue uppercase">
					not provided by rest api
				</div>
			</InfoCell>
			<InfoCell>
				<span>Active status:</span>
				<div class="col-span-2">{sw360user.deactivated ? 'Inactive' : 'Active'}</div>
			</InfoCell>
			<InfoCell>
				<span>Department:</span>
				<div class="col-span-2">{sw360user.department}</div>
			</InfoCell>
			<InfoCell>
				<span>Primary Roles:</span>
				<div class="col-span-2">{sw360user.userGroup}</div>
			</InfoCell>
			<InfoCell>
				<span>Secondary Department and Roles:</span>
				<div class="col-span-2 font-bold text-red-700 sw360-paleblue uppercase">
					not provided by rest api
				</div>
			</InfoCell>
		</div>
	</div>
</div>
