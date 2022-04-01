<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module" lang="ts">
  export async function load({ url, fetch, session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    const userlist = await Promise.all([
      fetch(`/admin/user/userlist.json${url.search}`, { credentials: 'include' }).then(r =>
        r.json()
      )
    ])

    return {
      props: {
        userlist
      }
    }
  }
</script>

<script lang="ts">
  import AdvancedSearch from '$lib/components/AdvancedSearch.svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import Grid from 'gridjs-svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import UserActions from './UserActions.svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'

  export let userlist

  let name = 'Users'
  let parent = 'Admin'
  let grid

  let pagination = {
    enabled: true,
    limit: 10
  }
  const data = []

  const search_items = [
    { title: 'Given Name', type: 'textedit', id: 'given_name' },
    { title: 'Last Name', type: 'textedit', id: 'last_name' },
    { title: 'Email', type: 'textedit', id: 'email' },
    { title: 'Primary Department', type: 'textedit', id: 'primary_department' },
    {
      title: 'Primary Department Role',
      type: 'listbox',
      id: 'primary_department_role',
      value: [
        'User',
        'Admin',
        'Clearing Admin',
        'Clearing Expert',
        'ECC Admin',
        'Security Admin',
        'SW360 Admin'
      ]
    }
  ]

  const columns = [
    'Given name',
    'Last name',
    {
      name: 'Email',
      formatter: cell => html(`<a href='/admin/user/${cell}'>${cell}</a>`)
    },
    'Primary Department',
    'Primary Department Role',
    'Secondary Department Role',
    {
      name: 'Actions',
      width: '10%',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: UserActions
        }
      }
    }
  ]

  for (const value of userlist[0].userlist) {
    data.push([
      value.givenName,
      value.lastName,
      value.email,
      value.department,
      value.userGroup,
      '',
      ''
    ])
  }

  const total = data.length

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <div><AdvancedSearch items={search_items} /></div>
  <div class="sw360-gridpanel-content-r">
    <ComponentHeader {name} {total}>
      <button class="sw360-button">Add User</button>
    </ComponentHeader>
    <div class="col-span-2">
      <div class="mt-4 col-span-2 sw360-navy-text">sw360 users</div>
      <div class="my-4 text-base text-gray-600">
        Show <span>
          <select on:change={doLimit} class="bg-white rounded border p-1">
            <option selected>10</option><option>25</option><option>50</option><option>100</option>
          </select>
        </span>entries
      </div>
      <Grid bind:instance={grid} {data} {columns} sort pagination={{ enabled: true }} />
    </div>
  </div>
</div>
