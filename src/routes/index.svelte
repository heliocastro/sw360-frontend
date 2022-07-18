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
    return {}
  }
</script>

<script lang="ts">
  import Grid from 'gridjs-svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { html } from 'gridjs'

  let projects_data = []
  let assignment_data = []
  let components_data = []
  let submission_data = []

  const projects_columns = [
    { name: 'Project Name', width: '35%', formatter: cell => html(cell) },
    { name: 'Release name', width: '35%' },
    { name: 'Approved Releases', width: '27%' }
  ]

  const assignment_columns = [
    { name: 'Document Name', width: '20%', formatter: cell => html(cell) },
    { name: 'Status', width: '10%' }
  ]

  const components_columns = [
    { name: 'Document Name', width: '20%', formatter: cell => html(cell) },
    { name: 'Status', width: '10%' }
  ]

  const submission_columns = [
    { name: 'Document Name', width: '30%', formatter: cell => html(cell) },
    { name: 'Status', width: '30%' },
    { name: 'Actions', width: '10%' }
  ]

  const name = 'Home'
</script>

<PageHeader {name} />

<div class="grid grid-cols-[39%_39%_19%] px-16 pt-4 pb-8 gap-8">
  <div class="grid grid-cols-1 content-start">
    <div class="sw360-navy-text">MY PROJECTS</div>
    <Grid columns={projects_columns} data={projects_data} pagination />
    <div class="mt-8 sw360-navy-text">MY task assignment</div>
    <Grid columns={assignment_columns} data={assignment_data} pagination />
  </div>
  <div class="grid grid-cols-1 content-start">
    <div class="sw360-navy-text">MY COMPONENTS</div>
    <Grid columns={components_columns} data={components_data} pagination />
    <div class="mt-8 sw360-navy-text">MY task submissions</div>
    <Grid columns={submission_columns} data={submission_data} pagination />
  </div>
  <div class="grid grid-cols-1 content-start">
    <div class="sw360-navy-text">My Subscriptions</div>
    <div class="sw360-navy-text">Recent Components</div>
    <div class="sw360-navy-text">Recent Releases</div>
  </div>
</div>
