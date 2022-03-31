<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
  export const prerender = true

  export async function load({ url, fetch, session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    let headers = new Headers({ Endpoint: 'projects' })
    url.search = new URLSearchParams({ allDetails: '1' }).toString()
    const projects = await Promise.all([
      fetch(`/data/data.json${url.search}`, { credentials: 'include', headers: headers }).then(r =>
        r.json()
      )
    ])

    return {
      props: {
        projects
      }
    }
  }
</script>

<script lang="ts">
  import AdvancedSearch from '$lib/components/AdvancedSearch.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import ProjectState from './ProjectState.svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'

  export let projects
  let name = 'Projects'
  let grid
  let pagination = {
    enabled: true,
    limit: 10
  }

  const search_items = [
    { title: 'Project Name', type: 'textedit', id: 'project_name' },
    { title: 'Project Version', type: 'textedit', id: 'categories' },
    {
      title: 'Project Type',
      type: 'listbox',
      id: 'project_type',
      value: ['Customer Project', 'Internal Project', 'Product', 'Service', 'Inner Source']
    },
    { title: 'Project Responsible (Email)', type: 'textedit', id: 'project_responsible' },
    { title: 'Group', type: 'listbox', id: 'group' },
    { title: 'State', type: 'listbox', id: 'state', value: ['Active', 'Phaseout', 'Unknown'] },
    {
      title: 'Clearing State',
      type: 'listbox',
      id: 'clearing_state',
      value: ['Open', 'In Progress', 'Closed']
    },
    { title: 'Tag', type: 'textedit', id: 'tag' },
    { title: 'Additional Data', type: 'textedit', id: 'additional_data' }
  ]

  const columns = [
    {
      name: 'Project name',
      formatter: cell => html(`<a href='/component/${cell}'>${cell}</a>`)
    },
    'Description',
    {
      name: 'Project responsible',
      formatter: cell => html(`<a href='/component/${cell}'>${cell}</a>`)
    },
    {
      name: 'State',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: ProjectState
        }
      }
    },
    'License Clearing',
    'Actions'
  ]

  const data = []
  for (const value of projects[0]) {
    data.push([
      `${value.name}(${value.version})`,
      value.description,
      value.projectResponsible,
      value.state,
      'data',
      ''
    ])
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
