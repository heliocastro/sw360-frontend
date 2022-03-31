<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script lang="ts">
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
