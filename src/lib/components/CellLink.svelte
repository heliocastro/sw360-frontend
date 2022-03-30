<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->

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
