<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: {}
		};
	}
</script>

<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';

	let name = 'Requests';
</script>

<PageHeader {name} />
