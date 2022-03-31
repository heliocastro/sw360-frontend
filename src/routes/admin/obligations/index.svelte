<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
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
  import QuickFilter from '$lib/components/QuickFilter.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'

  const name = 'Obligations'
  const parent = 'Admin'
  let total = 0
  const data = []
  let grid

  let pagination = {
    enabled: true,
    limit: 10
  }
  let search = {
    keyword: ''
  }

  const columns = ['Title', 'Text', 'Obligation Level', 'Actions']

  total = data.length

  async function doSearch() {
    search.keyword = this.value
    grid.updateConfig({ search }).forceRender()
  }

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <QuickFilter searchFunction={doSearch} />

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader {name} {total}>
      <button class="sw360-button">Add Obligation</button>
    </ComponentHeader>

    <div class="my-4 text-base text-gray-600">
      Show <span>
        <select on:change={doLimit} class="bg-white rounded border p-1">
          <option selected>10</option><option>25</option><option>50</option><option>100</option>
        </select>
      </span>entries
    </div>
    <div class="col-span-2">
      <Grid bind:instance={grid} {data} {columns} sort {search} {pagination} />
    </div>
  </div>
</div>
