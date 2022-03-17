<script>
	import Button from '$lib/components/Button.svelte';
	import RadioButton from '$lib/components/RadioButton.svelte';
	import LicenseCell from '$lib/components/LicenseCell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCheckCircle, faCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

	function nl2br(str) {
		console.log(str);
		let data = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
		console.log(data);
		return data;
	}

	export let license;

	let options = 'Details';
</script>

<PageHeader>Licenses > <span class="text-black">{license.shortName}</span></PageHeader>

<div class="grid grid-cols-6 pl-16 pr-16 pt-4 pb-8 gap-8">
	<div>
		<div>
			<div class="grid grid-cols-1 bg-white border border-gray-200 rounded w-full text-gray-500">
				<RadioButton label="Details" bind:options />
				<RadioButton label="Text" bind:options />
				<RadioButton label="Obligations" bind:options />
			</div>
		</div>
	</div>

	<div class="col-span-5 grid grid-cols-3 gap-8">
		<div><Button label="Edit License" /></div>
		<div class="col-span-2 text-right uppercase text-2xl text-sw360-grey">
			{license.fullName} ({license.shortName})
		</div>

		<div class="col-span-3 bg-white w-full text-gray-900">
			{#if options == 'Details'}
				<div class="text-left px-3 py-4 w-full bg-sw360-navyblue text-white font-bold">
					License Details
				</div>
				<LicenseCell>
					<span>Fullname:</span>
					<div class="cols-span-2">{license.fullName}</div>
				</LicenseCell>
				<LicenseCell>
					<span>Shortname:</span>
					<div class="cols-span-2">{license.shortName}</div>
				</LicenseCell>

				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>Is Checked:</span>
						<Fa icon={faCheckCircle} color="green" />
					</div>
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>Type:</span>
					</div>
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>OSI Approved?:</span>
						{#if license.OSIApproved == 'NA'}
							<Fa icon={faCircleXmark} color="red" />
						{:else}
							<Fa icon={faCheckCircle} color="green" />
						{/if}
					</div>
				</div>
				<div class="px-3 py-3 border border-gray-200 w-full">
					<div class="grid grid-cols-3">
						<span>FSF Free/Libre?:</span>
						{#if license.OSIApproved == 'NA'}
							<Fa icon={faCircleXmark} color="red" />
						{:else}
							<Fa icon={faCheckCircle} color="green" />
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