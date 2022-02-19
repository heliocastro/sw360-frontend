<script>
	import Grid from 'gridjs-svelte';
	import { apiData } from '$lib/stores/projects';
	console.log($apiData);
	const columns = ['name', 'summary', 'url'];
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<Grid
	{columns}
	sort
	search
	pagination={{ enabled: true }}
	server={{
		url: 'https://projects.eclipse.org/api/projects',
		then: (data) =>
			data.map((projects) => {
				return [projects.name, projects.summary, projects.url];
			})
	}}
/>
