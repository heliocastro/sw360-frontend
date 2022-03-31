<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script lang='ts'>
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import InfoCell from '$lib/components/InfoCell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RadioButton from '$lib/components/RadioButton.svelte';

	// icons
	// @ts-ignore
	import checkCircleSrc from '$lib/icons/check-circle.svg?src';
	// @ts-ignore
	import timesCircleSrc from '$lib/icons/times-circle.svg?src';

	export let license;

	let options = 'Details';
	let name = license.shortName ? license.shortName : 'License';
	let parent = 'Licenses';

	function nl2br(str) {
		let data = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
		return data;
	}

	function checkIcon(value) {
		let res = value
			? `<div class="w-4 fill-green-700">${checkCircleSrc}</div>`
			: `<div class="w-4 fill-red-700">${timesCircleSrc}</div>`;
		return res;
	}
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
	<div>
		<div class="grid grid-cols-1 bg-white border border-gray-200 rounded w-full text-gray-500">
			<RadioButton value="Details" bind:options>Details</RadioButton>
			<RadioButton value="Text" bind:options>Text</RadioButton>
			<RadioButton value="Obligations" bind:options>Obligations</RadioButton>
		</div>
	</div>

	<div class="sw360-gridpanel-content-r">
		<ComponentHeader name="{license.fullName} ({license.shortName})">
			<button class="sw360-button">Edit License</button>
		</ComponentHeader>

		<div class="col-span-2 grid grid-cols-1">
			{#if options == 'Details'}
				<div class="sw360-navy-bg-text">License Details</div>
				<InfoCell>
					<div>Fullname:</div>
					<div>{license.fullName}</div>
				</InfoCell>

				<InfoCell>
					<div>Shortname:</div>
					<div>{license.shortName}</div>
				</InfoCell>

				<InfoCell>
					<div>Is Checked:</div>
					{@html checkIcon(license.checked)}
				</InfoCell>

				<InfoCell>
					<div>Type:</div>
					<div />
				</InfoCell>

				<InfoCell>
					<div>OSI Approved?:</div>
					<div>
						{@html checkIcon(license.OSIApproved !== 'NA')}
					</div>
				</InfoCell>

				<InfoCell>
					<div>FSF Free/Libre?:</div>
					{@html checkIcon(license.OSIApproved !== 'NA')}
				</InfoCell>

				<InfoCell>
					<div class="place-self-center justify-self-start">
						External link for more information:
					</div>
					<div class="flex gap-3 items-center">
						<input type="text" class="form-control px-2 h-10 border rounded" />
						<button class="sw360-button-reverse">Save</button>
					</div>
				</InfoCell>
			{:else if options == 'Text'}
				<div class="col-span-2 sw360-navy-bg-text">License Text</div>
				<div class="col-span-2 px-3 py-3 border border-gray-200 w-full">
					{@html nl2br(license.text)}
				</div>
			{/if}
		</div>
	</div>
</div>
