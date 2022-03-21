<script>
	import { page, session } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import RadioHeaderButton from '$lib/components/RadioHeaderButton.svelte';

	let src = '/images/sw360.png';
	let path;
	export let visible = true;

	function getPath(currentPath) {
		path = currentPath;
		console.log(path);
	}

	$: getPath($page.url.pathname);

	async function logout() {
		// this will trigger a redirect, because it
		// causes the `load` function to run again
		$session.user = null;
	}
</script>

<header class:visible>
	<div class="grid grid-cols-2 pl-16 items-center">
		<!-- <div class="py-6"> -->
		<img class="py-6 w-36" id="sw360logo" {src} alt="SW360" />
		<!-- </div> -->
		<div class="justify-self-end pr-16">
			{#if $session.user}
				<button
					class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
					on:click={logout}
				>
					Logout
				</button>
			{/if}
		</div>

		<nav>
			{#if $session.user}
				<div class="flex items-left inline-flex gap-4" role="group">
					<RadioHeaderButton label="Home" link="/" active={path === '/'} />
					<RadioHeaderButton
						label="Projects"
						link="/projects"
						active={path.startsWith('/projects')}
					/>
					<RadioHeaderButton
						label="Components"
						link="/components"
						active={path.startsWith('/components')}
					/>
					<RadioHeaderButton
						label="Licenses"
						link="/licenses"
						active={path.startsWith('/licenses')}
					/>
					<RadioHeaderButton label="ECC" link="/ecc" active={path.startsWith('/ecc')} />
					<RadioHeaderButton
						label="Vulnerabilities"
						link="/vulnerabilities"
						active={path.startsWith('/vulnerabilities')}
					/>
					<RadioHeaderButton
						label="Requests"
						link="/requests"
						active={path.startsWith('/requests')}
					/>
					<RadioHeaderButton label="Search" link="/search" active={path.startsWith('/search')} />
					<RadioHeaderButton label="Admin" link="/admin" active={path.startsWith('/admin')} />
					<RadioHeaderButton
						label="Preferences"
						link="/preferences"
						active={path.startsWith('/preferences')}
					/>
				</div>
			{:else}
				<RadioHeaderButton label="Welcome" link="/" active={path === '/'} />
			{/if}
		</nav>
	</div>
</header>
