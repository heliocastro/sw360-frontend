<script lang="ts">
  import Grid from 'gridjs-svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'
  import ChangelogActions from './ChangelogActions.svelte'

  export let changelog

  let events = []

  let grid
  let pagination = {
    enabled: true,
    limit: 10
  }

  // Which changelog is active or main list
  let current_changelog = '0'

  const columns = [
    {
      name: 'Date'
    },
    {
      name: 'Changelog Id'
    },
    {
      name: 'Change Type'
    },
    {
      name: 'User'
    },
    {
      name: 'Action',
      width: '10%',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: ChangelogActions
        }
      }
    }
  ]

  const data = []
  for (const value of changelog) {
    data.push([value.changeTimestamp, value.documentId, value.operation, value.userEdited])
  }

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

<div class="col-span-2">
  <div>Events: {events}</div>
  {#if current_changelog == '0'}
    <div class="my-4 text-base text-gray-600">
      Show <span>
        <select on:change={doLimit} class="bg-white rounded border p-1">
          <option selected>10</option><option>25</option><option>50</option><option>100</option>
        </select>
      </span>entries
    </div>
    <Grid bind:instance={grid} {data} {columns} sort {pagination} />
  {/if}
</div>
