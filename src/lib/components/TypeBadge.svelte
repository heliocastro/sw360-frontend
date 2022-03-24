<script>
	export let color = 'black';
</script>

<div class="font-bold w-5 h-5 uppercase rounded-sm {color}">
	<p class="text-xs text-white pt-0.5 align-middle text-center font-semibold">
		<slot />
	</p>
</div>
