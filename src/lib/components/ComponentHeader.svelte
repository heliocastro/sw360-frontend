<script>
	export let total = null;
	export let name = '';
</script>

<div class="flex gap-2 content-center">
	<slot />
</div>
<div class="text-right text-2xl text-sw360-grey place-self-end self-center uppercase">
	{name}{#if total !== null}: ({total}){/if}
</div>
