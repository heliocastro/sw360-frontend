<script context="module">
	export const prerender = true;

	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils.js';
	import ListErrors from '$lib/ListErrors.svelte';

	let email = 'helio@kde.org';
	let password = 'genoma';
	let errors = null;

	async function submit(event) {
		const response = await post(`auth/login`, { email, password });

		if (response.user) {
			$session.user = response.user;
			goto('/');
		}
	}
</script>

<div>
	<div class="mx-14 my-20 rounded-md p-7 bg-gray-100">
		<div class="text-4xl mt-7 mb-5">Welcome to SW360!</div>
		<div class="text-lg text-justify">
			SW360 is an open source software project that provides both a web application and a repository
			to collect, organize and make available information about software components. It establishes
			a central hub for software components in an organization.
		</div>
		<div class="my-5" />
		<div class="text-lg font-bold">
			In order to go ahead, please sign in or create a new account!
		</div>
		<ListErrors {errors} />
		<form on:submit|preventDefault={submit}>
			<span class="grid mt-2">
				<label class="block text-balck text-sm font-bold mb-2" for="password">
					Email Address
				</label>
				<input
					class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
					id="email"
					bind:value={email}
				/>
			</span>
			<span class="grid mt-2">
				<label class="block text-balck text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
					id="password"
					type="password"
					required
					bind:value={password}
				/>
			</span>

			<button
				class="py-2 px-4 text-black mt-2 hover:text-white text-md font-bold border bg-sw360-orange rounded"
				type="submit"
			>
				Sign-In
			</button>
		</form>
	</div>
</div>
