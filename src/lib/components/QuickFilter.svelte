<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script>
	export let searchFunction = () => {};
</script>

<div class="rounded">
	<div class="sw360-navy-header">Quick Filter</div>

	<div class="bg-sw360-paleblue flex h-24 justify-center items-center">
		<input
			class="shadow appearance-none border rounded-b w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="quickfilter"
			type="search"
			on:keyup={searchFunction}
		/>
	</div>
</div>
