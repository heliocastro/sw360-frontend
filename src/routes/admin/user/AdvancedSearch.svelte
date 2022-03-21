<script>
	import BasicEntry from '$lib/components/BasicEntry.svelte';
</script>

<div class="rounded border bg-sw360-paleblue min-w-[16em] max-w-[16em] ">
	<div class="sw360-navy-header">Advanced Search</div>

	<div class="bg-sw360-paleblue grid cols-1 mt-4 mb-3 ml-4 mr-4 justify-center items-center gap-4 ">
		<BasicEntry title="Given Name">
			<input
				class="appearance-none border rounded-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="givenname"
			/>
		</BasicEntry>
		<BasicEntry title="Last Name">
			<input
				class="appearance-none border rounded-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="lastname"
			/>
		</BasicEntry>
		<BasicEntry title="EMail">
			<input
				class="appearance-none border rounded-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
			/>
		</BasicEntry>
		<BasicEntry title="Primary Department">
			<input
				class="appearance-none border rounded-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="lastname"
			/>
		</BasicEntry>
		<BasicEntry title="Primary Department Role">
			<select
				class="form-select border rounded-b w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline transition block bg-clip-padding"
			>
				<option selected />
				<option value="1">User</option>
				<option value="2">Admin</option>
				<option value="3">Clearing Admnin</option>
				<option value="4">Clearing Expert</option>
				<option value="5">ECC Admin</option>
				<option value="6">Security Admin</option>
				<option value="7">sw360 Admin</option>
			</select>
		</BasicEntry>
		<button class="sw360-button">Search</button>
	</div>
</div>
