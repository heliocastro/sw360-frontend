<script>
	let pagination;
</script>

<div class="my-4 text-base text-gray-600">
	Show <span>
		<select
			bind:value={pagination}
			on:change={updategrid}
			class="bg-white rounded border p-1"
		>
			<option selected>10</option><option>25</option><option>50</option><option>100</option>
		</select>
	</span>entries
</div>
