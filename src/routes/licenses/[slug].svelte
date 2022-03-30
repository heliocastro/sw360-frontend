<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script>
	import ComponentHeader from '$lib/components/ComponentHeader.svelte';
	import InfoCell from '$lib/components/InfoCell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RadioButton from '$lib/components/RadioButton.svelte';

	// icons
	import checkCircleSrc from '$lib/icons/check-circle.svg?src';
	import timesCircleSrc from '$lib/icons/times-circle.svg?src';

	function nl2br(str) {
		let data = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
		return data;
	}

	export let license;

	let options = 'Details';
	let name = license.shortName ? license.shortName : 'License';
	let parent = 'Licenses';
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
	<div>
		<div>
			<div class="grid grid-cols-1 bg-white border border-gray-200 rounded w-full text-gray-500">
				<RadioButton value="Details" bind:options>Details</RadioButton>
				<RadioButton value="Text" bind:options>Text</RadioButton>
				<RadioButton value="Obligations" bind:options>Obligations</RadioButton>
			</div>
		</div>
	</div>

	<div class="sw360-gridpanel-content-r">
		<ComponentHeader name="{license.fullName} ({license.shortName})">
			<button class="sw360-button">Edit License</button>
		</ComponentHeader>

		<div class="col-span-2 bg-white w-full text-gray-900">
			{#if options == 'Details'}
				<div class="sw360-navy-bg-text">License Details</div>
				<InfoCell>
					<span>Fullname:</span>
					<div class="cols-span-2">{license.fullName}</div>
				</InfoCell>
				<InfoCell>
					<span>Shortname:</span>
					<div class="cols-span-2">{license.shortName}</div>
				</InfoCell>

				<InfoCell>
					<span>Is Checked:</span>

					<div class="grid grid-cols-1">
						{#if license.checked}
							{@html `<div class="w-4 fill-green-700">${checkCircleSrc}</div>`}
						{:else}
							{@html `<div class="w-4 fill-red-700">${timesCircleSrc}</div>`}
						{/if}
					</div>
				</InfoCell>
				<InfoCell>
					<div class="grid grid-cols-3">
						<span>Type:</span>
					</div>
				</InfoCell>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>OSI Approved?:</span>
						{#if license.OSIApproved == 'NA'}
							{@html `<div class="w-4 fill-red-700">${timesCircleSrc}</div>`}
						{:else}
							{@html `<div class="w-4 fill-green-700">${checkCircleSrc}</div>`}
						{/if}
					</div>
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>FSF Free/Libre?:</span>
						{#if license.OSIApproved == 'NA'}
							{@html `<div class="w-4 fill-red-700">${timesCircleSrc}</div>`}
						{:else}
							{@html `<div class="w-4 fill-green-700">${checkCircleSrc}</div>`}
						{/if}
					</div>
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>External link for more information:</span>
					</div>
				</div>
			{:else if options == 'Text'}
				<div class="text-left px-3 py-4 w-full bg-sw360-navyblue text-white font-bold break-normal">
					License Text
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">{@html nl2br(license.text)}</div>
			{/if}
		</div>
	</div>
</div>
