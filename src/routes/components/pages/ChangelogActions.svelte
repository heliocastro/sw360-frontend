<script lang="ts">
  import Icon from '@iconify/svelte'

  // Workaround over the Gridjs Bug
  export let cell
  console.log(cell)
  export let row
  console.log(row)
  export let column
  console.log(column)

  export let events
</script>

<div class="flex justify-center gap-2">
  <Icon
    icon="sw360-rules"
    height="18"
    class="text-gray-500 hover:text-sw360-orange"
    on:click={e => (events[row] = e)}
  />
</div>
