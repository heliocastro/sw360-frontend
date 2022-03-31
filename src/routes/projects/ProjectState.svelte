<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script lang="ts">
	export let state = 'ACTIVE';
	export let clearingState = 'OPEN';

	let psColor = null;
	let csColor = null;

	switch (state) {
		case 'ACTIVE':
			psColor = 'green-500';
			break;
		default:
			psColor = 'gray-500';
			break;
	}

	switch (clearingState) {
		case 'OPEN':
			csColor = 'red-500';
			break;
		case 'CLOSED':
			csColor = 'green-500';
			break;
		case 'IN_PROGRESS':
			csColor = 'yellow-600';
			break;
	}
</script>

<div class="flex w-8 h-6 font-bold text-white text-xs">
	<span class="p-1 rounded-l-lg bg-{psColor}">PS</span>
	<span class="p-1 rounded-r-lg bg-{csColor}">CS</span>
</div>
