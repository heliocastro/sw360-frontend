<script>
	import { page, session } from '$app/stores';
	let src = '/images/sw360.png';
</script>

<header>
	<div>
		<img id="sw360logo" {src} alt="SW360" />
	</div>

	<nav>
		{#if $session.user}
			<ul>
				<li class:active={$page.url.pathname === '/'}>
					<a sveltekit:prefetch href="/">Home</a>
				</li>
				<li class:active={$page.url.pathname === '/projects'}>
					<a sveltekit:prefetch href="/projects">Projects</a>
				</li>
				<li class:active={$page.url.pathname === '/components'}>
					<a sveltekit:prefetch href="/components">Components</a>
				</li>
				<li class:active={$page.url.pathname === '/licenses'}>
					<a sveltekit:prefetch href="/licenses">Licenses</a>
				</li>
				<li class:active={$page.url.pathname === '/ecc'}>
					<a sveltekit:prefetch href="/ecc">ECC</a>
				</li>
				<li class:active={$page.url.pathname === '/vulnerabilities'}>
					<a sveltekit:prefetch href="/vulnerabilities">Vulnerabilities</a>
				</li>
				<li class:active={$page.url.pathname === '/requests'}>
					<a sveltekit:prefetch href="/requests">Requests</a>
				</li>
				<li class:active={$page.url.pathname === '/search'}>
					<a sveltekit:prefetch href="/search">Search</a>
				</li>
				<li class:active={$page.url.pathname === '/admin'}>
					<a sveltekit:prefetch href="/admin">Admin</a>
				</li>
				<li class:active={$page.url.pathname === '/preferences'}>
					<a sveltekit:prefetch href="/preferences">Preferences</a>
				</li>
			</ul>
		{:else}
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Welcome</a>
			</li>
		{/if}
	</nav>
</header>

<style>
	nav {
		padding: 1rem;
		margin-left: 40px;
		margin-right: 40px;
	}
	nav a {
		margin-right: 1rem;
		color: #6c757d;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
		text-decoration: none;
	}

	ul {
		position: relative;
		padding: 0;
		height: 3em;
		display: flex;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid #f7941e;
		width: 1em;
	}

	img#sw360logo {
		margin-left: 50px;
		margin-top: 20px;
		width: 147px;
	}
</style>
