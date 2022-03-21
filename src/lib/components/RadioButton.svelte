<script>
	export let options;
	export let value;
</script>

<label>
	<input bind:group={options} {value} type="radio" class="hidden peer" />
	<div
		class="text-left pl-3 py-4 border-b border-gray-200 w-full peer-checked:bg-sw360-paleorange peer-checked:font-bold peer-checked:text-black hover:bg-orange-100 transition duration-150 ease-in-out"
	>
		<slot />
	</div>
</label>
