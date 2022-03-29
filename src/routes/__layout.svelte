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
