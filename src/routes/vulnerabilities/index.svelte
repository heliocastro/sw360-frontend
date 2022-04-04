<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
  export const prerender = true

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
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import QuickFilter from '$lib/components/QuickFilter.svelte'

  import { html } from 'gridjs'

  let data = []
  let grid
  let name = 'Vulnerabilities'
  let total = 0

  let pagination = {
    enabled: true,
    limit: 10
  }

  let search = {
    keyword: ''
  }

  const columns = [
    { name: 'External Id', width: '20%', formatter: cell => html(cell) },
    { name: 'Title' },
    { name: 'Weighting' },
    { name: 'Publish Date' },
    { name: 'Last Update' }
  ]

  async function doSearch() {
    search.keyword = this.value
    grid.updateConfig({ search }).forceRender()
  }

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<PageHeader {name} />

<div class="sw360-gridpanel">
  <QuickFilter searchFunction={doSearch} />

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader {name} {total}>
      <button class="sw360-button-reverse">Show All</button>
    </ComponentHeader>
    <div class="col-span-2">
      <div class="my-4 text-base text-gray-600">
        Show <span>
          <select on:change={doLimit} class="bg-white rounded border p-1">
            <option selected>10</option><option>25</option><option>50</option><option>100</option>
          </select>
        </span>entries
      </div>
      <Grid bind:instance={grid} {data} {columns} sort {search} {pagination} />
    </div>
  </div>
</div>
