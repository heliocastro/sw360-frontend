<script>
	export let name = '';
	export let parent = null;
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="w-full border-b border-t">
	<div class="pl-16 py-2 text-gray-700">
		{#if parent} <span class="text-gray-500">{parent} > </span>{/if}
		{name}
	</div>
</div>
