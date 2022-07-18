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
    const response = await fetch(`/data/data.json`, {
      credentials: 'include',
      headers: headers
    })

    return {
      props: {
        licenses: response.ok && (await response.json())
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
  import SvelteTable from 'svelte-table'
  import CheckStatus from './CheckStatus.svelte'
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
  let svelte_search = { license_shortname: '' }
  $: numRows = 10
  $: selectedCols = ['license_shortname', 'license_fullname', 'is_checked', 'license_type']
  $: cols = selectedCols.map(key => Object.assign(svelte_columns[key]))

  const svelte_columns = {
    license_shortname: {
      key: 'license_shortname',
      title: 'License Shortname',
      value: v => v[0],
      sortable: true,
      headerClass: 'text-left pl-2 border rounded-tl-md',
      class: 'h-12 pl-2 border'
    },
    license_fullname: {
      key: 'license_fullname',
      title: 'License Fullname',
      value: v => v[1],
      sortable: true,
      headerClass: 'text-left pl-2 border',
      class: 'h-12 pl-2 border'
    },
    is_checked: {
      key: 'is_checked',
      title: 'Is Checked',
      value: v => v[2],
      renderComponent: CheckStatus,
      sortable: true,
      headerClass: 'text-center border',
      class: 'border'
    },
    license_type: {
      key: 'license_type',
      title: 'License Type',
      value: v => '',
      sortable: false,
      headerClass: 'text-left pl-2 border rounded-tr-md',
      class: 'h-12 pl-2 border'
    }
  }

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
  let checked_color: String
  for (const value of licenses) {
    const url = new URL(value._links.self.href)
    checked_color = value.checked ? 'text-green-700' : 'text-red-700'
    const shortName = getLastItem(url.pathname)
    data.push([
      `<a href='/licenses/${shortName}'>${shortName}</a></div>`,
      value.fullName,
      value.checked,
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
    numRows = this.value
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
      <SvelteTable
        columns={cols}
        rows={data}
        iconSortable="<span style='color: white;'>▲▼</span>"
        classNameTable={['w-full text-sm text-black border-black rounded']}
        classNameThead={['h-12 text-white bg-sw360-navyblue text-left pl-12']}
        classNameRow={['h-20 bg-orange-100']}
        classNameCell={['h-20 bg-orange-100']}
        bind:filterSelections={svelte_search}
        {selectedCols}
      />
      <Grid bind:instance={grid} {data} {columns} sort {search} {pagination} />
    </div>
  </div>
</div>
