<script>
	export let title = null;
</script>

<div class="grid grid-cols-1 gap-1">
	{#if title}<div class="font-bold">{title}</div>{/if}
	<slot />
</div>
