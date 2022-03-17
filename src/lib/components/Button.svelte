<script>
	export let label = 'Your text here';
	export let type = '';
</script>

<span class="inline-block ml-2">
	<button
		class="py-2 px-4 text-black mt-2 hover:text-white text-base font-bold border bg-sw360-orange rounded"
		{type}
	>
		{label}
	</button>
</span>
