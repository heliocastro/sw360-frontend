<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
  export async function load({ params, fetch, session, stuff }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    const headers = new Headers({ Endpoint: 'components' })
    const response = await fetch(`/data/data.json`, { credentials: 'include', headers: headers })
    const components = response.ok && (await response.json())

    return {
      props: {
        components: components
      }
    }
  }
</script>

<script lang="ts">
  import AdvancedSearch from '$lib/components/AdvancedSearch.svelte'
  import ComponentActions from './ComponentActions.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'
  import { sw360id } from '$lib/utils'

  export let components

  let name = 'Components'
  let pagination = {
    enabled: true,
    limit: 10
  }
  let grid = null

  const search_items = [
    { title: 'Component Name', type: 'textedit', id: 'component_name' },
    { title: 'Categories', type: 'textedit', id: 'categories' },
    {
      title: 'Component Type',
      type: 'listbox',
      id: 'component_type',
      value: ['OSS', 'COTS', 'Internal', 'Inner Source', 'Service', 'Freeware', 'Code Snippet']
    },
    { title: 'Languages', type: 'textedit', id: 'languages' },
    { title: 'Software Platforms', type: 'textedit', id: 'software_platforms' },
    { title: 'Operating Systems', type: 'textedit', id: 'operating_systems' },
    { title: 'Vendors', type: 'textedit', id: 'vendors' },
    { title: 'Main licenses', type: 'textedit', id: 'main_licenses' },
    { title: 'Created by (Email)', type: 'textedit', id: 'email' }
  ]

  const columns = [
    {
      name: 'Vendor',
      width: '30%',
      formatter: cell => html(`<span class="font-bold text-red-900">${cell}</span>`)
    },
    {
      name: 'Component name',
      formatter: cell => html(`<a href='/components/${cell.id}'>${cell.name}</a>`)
    },
    {
      name: 'Main licenses',
      width: '20%',
      formatter: cell => html(`<span class="font-bold text-red-900">${cell}</span>`)
    },
    {
      name: 'Component type',
      width: '20%'
    },
    {
      name: 'Actions',
      width: '8%',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: ComponentActions
        }
      }
    }
  ]

  const data = []
  for (const value of components) {
    let nameId = { name: value.name, id: sw360id(value) }
    data.push(['NOT REST API', nameId, 'NOT REST API', value.componentType])
  }
  const total = data.length

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<PageHeader {name} />

<div class="sw360-gridpanel">
  <AdvancedSearch items={search_items} />

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader {name} {total}>
      <button class="sw360-button">Add Vendor</button>
      <button class="sw360-button-reverse">Import SPDX BOM</button>
      <button class="sw360-button-reverse">Export Spreadsheet</button>
    </ComponentHeader>

    <div class="col-span-2">
      <div class="my-4 text-base text-gray-600">
        Show <span>
          <select on:change={doLimit} class="bg-white rounded border p-1">
            <option selected>10</option><option>25</option><option>50</option><option>100</option>
          </select>
        </span>entries
      </div>

      <Grid bind:instance={grid} {data} {columns} sort {pagination} />
    </div>
  </div>
</div>
