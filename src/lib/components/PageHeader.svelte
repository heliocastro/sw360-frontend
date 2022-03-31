<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
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
