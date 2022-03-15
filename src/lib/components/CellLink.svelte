<script>
	export let row;
	export let column;
	export let cell;

	const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);

	console.log(row._cells);

	const url = new URL(row[0]);
	const linkName = getLastItem(url.pathname);
</script>

<a href={$url.href}>linkName</a>
