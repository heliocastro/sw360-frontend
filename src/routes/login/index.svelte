<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}

	import { modalState, loginForm } from "$lib/stores/index";

	import Modal from "$lib/components/Modal.svelte"
	import Button from "$lib/components/Button.svelte"
	import LoginForm from "$lib/components/modals/LoginForm.svelte"

	import { modal } from "$lib/stores/modal";

	const loginModal = { visible: true, modalId: 'login'}
	const proecessForm = {trigger:true}


</script>

<script>
// 	import { session } from '$app/stores';
// 	import { goto } from '$app/navigation';
// 	import { post } from '$lib/utils.js';
// 	import ListErrors from '$lib/ListErrors.svelte';
// import Modal from "$lib/components/Modal.svelte";
// import { loginForm, modalState } from '$lib/stores';
// import LoginModal from '$lib/login/LoginModal.svelte';
// 	let email = '';
// 	let password = '';
// 	let errors = null;
// 	async function submit(event) {
// 		const response = await post(`auth/login`, { email, password });
// 		// TODO handle network errors
// 		errors = response.errors;
// 		if (response.user) {
// 			$session.user = response.user;
// 			goto('/');
// 		}
// 	}
</script>


{#if $modalState == loginModal}
<Modal title="Sign In" buttonOptions={false}>
	<LoginForm />
</Modal>
{/if}
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
		<Button label="Sign In" on:click={() => modalState.update(() => loginModal)} />
	</div>
</div>

<!-- <div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<ListErrors {errors}/>

				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
						Sign in
					</button>
				</form>
			</div>
		</div>
	</div>
</div> -->
