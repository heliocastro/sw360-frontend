<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script>
	export let color = 'black';
</script>

<div class="font-bold w-5 h-5 uppercase rounded-sm {color}">
	<p class="text-xs text-white pt-0.5 align-middle text-center font-semibold">
		<slot />
	</p>
</div>
