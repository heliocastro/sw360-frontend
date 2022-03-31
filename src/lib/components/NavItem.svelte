<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ 

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
	import { goto } from '$app/navigation';
	export let label;
	export let link;
	export let active;

	function onClick() {
		goto(link);
	}
</script>

<label class="py-2">
	<input type="radio" checked={active} value={label} on:click={onClick} class="hidden peer" />
	<div
		class="text-left text-gray-500 font-bold text-base pb w-full peer-checked:text-black peer-checked:text-black transition duration-150 ease-in-out peer-checked:border-b-[3px] peer-checked:border-sw360-orange cursor-pointer"
	>
		{label}
	</div>
</label>
