<script>
	import { loginForm } from '$lib/stores/index';
</script>

<div>
  <span class="grid mt-2">
		<label class="block text-balck text-sm font-bold mb-2" for="password"> Email Address </label>
		<input
			class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
			id="email"
			bind:value={$loginForm.email}
		/>
	</span>
	<span class="grid mt-2">
		<label class="block text-balck text-sm font-bold mb-2" for="password"> Password </label>
		<input
			class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
			id="password"
			type="password"
			placeholder="******************"
			bind:value={$loginForm.password}
		/>
	</span>
</div>
