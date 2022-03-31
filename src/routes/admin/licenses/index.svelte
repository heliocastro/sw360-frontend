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
      }
    }

    return {
      props: {}
    }
  }
</script>

<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'

  const name = 'Licenses'
  const parent = 'Admin'
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <div class="sw360-gridpanel-content-full">
    <ComponentHeader name="License Administration">
      <button class="sw360-button">Download License Archive</button>
      <button class="sw360-button">Import SPDX Information</button>
      <button class="sw360-button">Import OSADL Information</button>
      <button class="sw360-button bg-red-600 hover:bg-red-800 text-white hover:text-white"
        >Delete all License Information</button
      >
    </ComponentHeader>
  </div>
</div>
