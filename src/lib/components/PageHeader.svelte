<script>
	export let child = null;
</script>

<div class="w-full border-b border-t">
	<div class="pl-16 py-2 text-gray-500">
		<slot />
		{#if child}> <span class="text-black">{child}</span>{/if}
	</div>
</div>
