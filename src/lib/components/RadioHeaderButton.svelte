<script>
	import { getContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const current = getContext('nav');

	import { goto } from '$app/navigation';
	export let label;
	export let link;
	export let active;

	function onClick() {
		goto(link);
	}
</script>

<label class="py-2">
	<input type="radio" checked={active} value={label} on:click={onClick} class="hidden peer" />
	<div
		class="text-left text-gray-500 font-bold text-base pb w-full peer-checked:text-black peer-checked:text-black transition duration-150 ease-in-out peer-checked:border-b-2 peer-checked:border-sw360-orange"
	>
		{label}
	</div>
</label>
