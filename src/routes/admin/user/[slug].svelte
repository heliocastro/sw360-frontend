<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import InfoCell from '$lib/components/InfoCell.svelte';
	export let sw360user;

	console.log(sw360user);
</script>

<PageHeader child="User">Admin</PageHeader>

<div class="grid grid-cols-3 pl-16 pr-16 pt-4 pb-8 gap-8">
	<div><button class="sw360-button">Edit User</button></div>
	<div class="col-span-2 text-right uppercase text-2xl text-sw360-grey">
		{sw360user.email}
	</div>

	<div class="col-span-3 bg-white w-full text-gray-900">
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
