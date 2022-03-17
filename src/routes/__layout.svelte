<script>
	import '../scss/app.scss';
	import '../css/sw360gridjs.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
