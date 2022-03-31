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
  import AdvancedSearch from '$lib/components/AdvancedSearch.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import Grid from 'gridjs-svelte'
  import { typecolor, entrypointsmap } from '$lib/settings'
  import { html } from 'gridjs'

  let name = 'Search'
  let multibinds = { selected: [], searchText: '' }
  let data = []
  let grid = null
  let total = 0
  let pagination = {
    enabled: true,
    limit: 10
  }

  const keyword_items = [
    { type: 'textedit', id: 'searchText' },
    {
      title: 'RESTRICT TO TYPE',
      type: 'checkbox',
      id: 'check_group',
      value: [
        { id: 'project', label: 'Projects', color: typecolor.project },
        { id: 'component', label: 'Components', color: typecolor.component },
        { id: 'license', label: 'Licenses', color: typecolor.license },
        { id: 'release', label: 'Releases', color: typecolor.release },
        { id: 'obligation', label: 'Obligations', color: typecolor.obligation },
        { id: 'user', label: 'Users', color: typecolor.user },
        { id: 'vendor', label: 'Vendors', color: typecolor.vendor }
      ]
    }
  ]

  const columns = [
    {
      name: 'Type',
      width: '10%',
      formatter: cell => html(cell)
    },
    {
      name: 'Text',
      width: '90%',
      formatter: cell => html(`<a href="${cell.url}">${cell.text}</a>`)
    }
  ]

  async function doSearch() {
    let paramsObj = { searchText: multibinds.searchText ? multibinds.searchText : '*' }

    data = []

    if (multibinds.selected.length) paramsObj['typeMasks'] = multibinds.selected.join(',')

    let searchParams = new URLSearchParams(paramsObj)

    const result = await Promise.all([
      fetch(`/search/search.json?${searchParams}`, { credentials: 'include' }).then(r => r.json())
    ])

    for (const value of result[0].result) {
      let type = `<div class="grid grid-col-1"><div class="w-5 h-5 place-self-center rounded-sm ${
        typecolor[value.type]
      }">
					<p class="text-xs text-white pt-0.5 align-middle text-center font-semibold uppercase">
						${value.type.charAt(0)}
					</p>
				</div></div>`
      data.push([
        type,
        {
          url: `/${entrypointsmap[value.type]}/${value.id}`,
          text: value.name
        }
      ])
    }

    total = data.length

    grid.updateConfig({ data }).forceRender()
  }

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<PageHeader {name} />
<div class="sw360-gridpanel">
  <div class="self-top">
    <AdvancedSearch
      title="Keyword Search"
      items={keyword_items}
      buttonAction={doSearch}
      bind:multibinds
    />
  </div>

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader name="Search Results" {total} />
    <div class="col-span-2">
      <div class="my-4 text-base text-gray-600">
        Show <span>
          <select on:change={doLimit} class="bg-white rounded border p-1">
            <option selected>10</option><option>25</option><option>50</option><option>100</option>
          </select>
        </span>entries
      </div>
      <Grid {data} {columns} bind:instance={grid} sort {pagination} />
    </div>
  </div>
</div>
