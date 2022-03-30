<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script>
	import { element_is } from 'svelte/internal';

	import TypeBadge from './TypeBadge.svelte';
	export let title = 'Advanced Search';
	export let items = [];
	export let multibinds = {};
	export let buttonAction = () => alert("I don't do anything yet");

	function toggle() {
		var selector = document.getElementsByName('sw360selector');
		let newchek = new Array();
		for (const element of selector) {
			if (multibinds.selected.indexOf(element.id) === -1) newchek.push(element.id);
		}
		multibinds.selected = newchek;
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
								<div class="grid grid-flow-col auto-cols-min gap-1">
									<label class="w-4">
										<input
											name="sw360selector"
											type="checkbox"
											{id}
											bind:group={multibinds.selected}
											value={id}
										/>
									</label>
									<TypeBadge {color}>{label.charAt(0)}</TypeBadge>
									<div class="font-bold">{label}</div>
								</div>
							{/each}
						{/if}
						<div class="flex items-center justify-center text-gray-500 mt-4">
							<button
								class="rounded-l px-3 py-1 hover:text-black font-bold bg-white border border-gray-300"
								on:click={toggle}>Toggle</button
							>
							<button
								class="rounded-r px-3 py-1 hover:text-black font-bold bg-white border border-gray-300"
								on:click={deselectall}>Deselect All</button
							>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
		<button class="sw360-button w-full" on:click={buttonAction}>Search</button>
	</div>
</div>
