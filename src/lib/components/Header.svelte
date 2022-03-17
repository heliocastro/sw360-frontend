<script>
	import { page, navigating, session } from '$app/stores';
	import RadioHeaderButton from '$lib/components/RadioHeaderButton.svelte';

	let src = '/images/sw360.png';
	let options = 'Home';

	async function logout() {
		// this will trigger a redirect, because it
		// causes the `load` function to run again
		$session.user = null;
	}
</script>

<header>
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
					<RadioHeaderButton label="Home" link="/" bind:options />
					<RadioHeaderButton label="Projects" link="/projects" bind:options />
					<RadioHeaderButton label="Components" link="/components" bind:options />
					<RadioHeaderButton label="Licenses" link="/licenses" bind:options />
					<RadioHeaderButton label="ECC" link="/ecc" bind:options />
					<RadioHeaderButton label="Vulnerabilities" link="/vulnerabilities" bind:options />
					<RadioHeaderButton label="Requests" link="/requests" bind:options />
					<RadioHeaderButton label="Search" link="/search" bind:options />
					<RadioHeaderButton label="Admin" link="/admin" bind:options />
					<RadioHeaderButton label="Preferences" link="/preferences" bind:options />
				</div>
			{:else}
				<RadioHeaderButton label="Welcome" link="/" bind:options />
			{/if}
		</nav>
	</div>
</header>
