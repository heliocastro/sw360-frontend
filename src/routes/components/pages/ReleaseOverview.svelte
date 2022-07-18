<script lang="ts">
  import Grid from 'gridjs-svelte'
  import { html } from 'gridjs'
  import { SvelteWrapper } from 'gridjs-svelte/plugins'
  import ReleaseOverviewActions from './ReleaseOverviewActions.svelte'

  export let component

  let grid
  let pagination = {
    enabled: true,
    limit: 10
  }

  const columns = [
    {
      name: 'Name',
      width: '10%',
    },
    {
      name: 'Version',
      width: '10%',
      formatter: cell => html(`<a href='/component/release/${cell}'>${cell}</a>`)
    },
    {
      name: 'Clearing State',
      width: '20%',
    },
    {
      name: 'Clearing Report',
      width: '20%',
    },
    {
      name: 'Release Mainline State',
      width: '30%',
    },
    {
      name: 'Action',
      width: '10%',
      plugin: {
        component: SvelteWrapper,
        props: {
          component: ReleaseOverviewActions
        }
      }
    }
  ]

  const data = []
  for (const value of component._embedded['sw360:releases']) {
    data.push([value.name, value.version])
  }

  async function doLimit() {
    pagination.limit = this.value
    grid.updateConfig({ pagination }).forceRender()
  }
</script>

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
