<script>
	import '../app.css';

	let src = '/images/sw360.png';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div>
	<div>
		<img {src} alt="SW360" />
	</div>

	<nav>
		<a href=".">Home</a>
		<a href="/Projects">Projects</a>
		<a href="/Components">Components</a>
		<a href="/Licenses">Licenses</a>
		<a href="/ECC">ECC</a>
		<a href="/Vulnerabilities">Vulnerabilities</a>
		<a href="/Requests">Requests</a>
		<a href="/Search">Search</a>
		<a href="/Admin">Admin</a>
		<a href="/Preferences">Preferences</a>
	</nav>
</div>

<slot />

<style>
	nav {
		padding: 1rem;
	}
	a {
		text-decoration: none;
		margin-right: 1rem;
		color: #6c757d;
		font-size: 0.95rem;
		font-weight: 600;
		padding-left: 0;
		padding-right: 0;
	}
</style>
