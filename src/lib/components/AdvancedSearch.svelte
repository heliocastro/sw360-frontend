<script>
	import BasicEntry from '$lib/components/BasicEntry.svelte';

	export let title = 'Advanced Search';
	export let items = null;
</script>

<div class="rounded border shadow-md bg-sw360-paleblue min-w-[16em] max-w-[16em]">
	<div class="sw360-navy-header">{title}</div>
	<div class="grid grid-cols-1 gap-3 px-3 py-3">
		{#if items}
			{#each items as item}
				<BasicEntry title={item.title}>
					{#if item.type === 'textedit'}
						<input
							class="sw360-advsearch-textedit focus:outline-none focus:shadow-outline"
							id={item.id}
						/>
					{:else if item.type === 'listbox'}
						<select
							class="sw360-advsearch-listbox focus:outline-none focus:shadow-outline form-select"
						>
							<option selected />
							{#if item.hasOwnProperty('value')}
								{#each item.value as value}
									<option>{value}</option>
								{/each}
							{/if}
						</select>
					{/if}
				</BasicEntry>
			{/each}
		{:else}
			<slot />
		{/if}
		<button class="sw360-button w-full">Search</button>
	</div>
</div>
