<script>
	import { goto } from '$app/navigation';
	export let options;
	export let label;
	export let link;

	function onClick(event) {
		goto(link);
	}
</script>

<label class="py-2">
	<input bind:group={options} type="radio" value={label} on:click={onClick} class="hidden peer" />
	<div
		class="text-left text-gray-500 font-bold text-base pb-1 w-full peer-checked:text-black peer-checked:text-black transition duration-150 ease-in-out peer-checked:border-b-4 peer-checked:border-sw360-orange"
	>
		{label}
	</div>
</label>
