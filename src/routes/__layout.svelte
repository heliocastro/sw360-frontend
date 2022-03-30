<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script>
	import '../scss/app.scss';
	import '../css/sw360gridjs.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="/icons/favicon.ico" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
