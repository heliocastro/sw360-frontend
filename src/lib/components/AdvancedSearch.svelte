<script>
	export let title = 'Advanced Search';
	export let items = [];
	export let multibinds = {};
	export let buttonAction = () => alert("I don't do anything yet");

	function toggle() {
		for (const element of multibinds.selected) {
			checj
			console.log(element);
		}
	}

	function deselectall() {
		multibinds.selected = [];
	}
</script>

<div class="rounded border shadow-md bg-sw360-paleblue min-w-[16em] max-w-[16em]">
	<div class="sw360-navy-header">{title}</div>
	<div class="grid grid-cols-1 gap-3 px-3 py-3">
		{#if items}
			{#each items as item}
				<div class="grid grid-cols-1 gap-1">
					{#if item.title}<div class="font-bold">{item.title}</div>{/if}
					{#if item.type === 'textedit'}
						<input
							class="sw360-advsearch-textedit focus:outline-none focus:shadow-outline"
							id={item.id}
							bind:value={multibinds.searchText}
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
					{:else if item.type === 'checkbox'}
						{#if item.hasOwnProperty('value')}
							{#each item.value as { id, label, color }}
								<label class="font-bold">
									<input
										name="sw360selector"
										type="checkbox"
										{id}
										bind:group={multibinds.selected}
										value={id}
									/>
									<span class="font-bold text-white ml-2 px-1.5 py-0.5 uppercase {color}">
										{label.charAt(0)}
									</span>
									{label}
								</label>
							{/each}
						{/if}
					{/if}
				</div>
			{/each}
		{/if}
		<div class="flex items-center justify-center text-gray-600">
			<button class="rounded-l px-2 py-1 hover:text-black font-bold bg-white border" on:click={toggle}
				>Toggle</button
			>
			<button class="rounded-r px-1 py-1 hover:text-black font-bold bg-white border" on:click={deselectall}
				>Deselect All</button
			>
		</div>
		<button class="sw360-button w-full" on:click={buttonAction}>Search</button>
	</div>
</div>
