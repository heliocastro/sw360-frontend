<script>
	export let pagination;

	async function limit() {
		console.log(pagination.limit);
		//pagination.limit = 100;
	}
</script>

<div class="my-4 text-base text-gray-600">
	Show <span>
		<select bind:value={pagination} on:change={limit} class="bg-white rounded border p-1">
			<option selected>10</option><option>25</option><option>50</option><option>100</option>
		</select>
	</span>entries
</div>
