<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
  export async function load({ fetch, session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    const headers = new Headers({ Endpoint: 'licenses' })
    const licenses = await Promise.all([
      fetch(`/data/data.json`, { credentials: 'include', headers: headers }).then(r => r.json())
    ])

    return {
      props: {
        licenses
      }
    }
  }
</script>

<script lang="ts">
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'
  import Icon from '@iconify/svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import QuickFilter from '$lib/components/QuickFilter.svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'

  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

  export let licenses
  let name = 'Licenses'
  let pagination = {
    enabled: true,
    limit: 10
  }
  let search = {
    keyword: ''
  }
  let grid = null

  const columns = [
    {
      name: 'License Shortname',
      formatter: cell => html(cell),
      width: '25%'
    },
    {
      name: 'License Fullname',
      width: '55%'
    },

    {
      name: 'Is Checked',
      width: '10%',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: Icon
        }
      }
    },
    {
      name: 'License Type',
      width: '15%'
    }
  ]

  const data = []
  for (const value of licenses[0]) {
    const url = new URL(value._links.self.href)
    const checked = value.checked ? 'fill-green-700' : 'fill=red-700'
    const shortName = getLastItem(url.pathname)
    data.push([
      `<a href='/licenses/${shortName}'>${shortName}</a></div>`,
      value.fullName,
      'sw360-check-circle',
      '--'
    ])
  }
  const total = data.length

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
      <button class="sw360-button">Add License</button>
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
