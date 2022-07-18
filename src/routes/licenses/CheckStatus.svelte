<script>
  import Icon from '@iconify/svelte'

  export let row
</script>

<div class="flex justify-center gap-2">
  {#if row[2]}
    <Icon icon="sw360-check-circle" height="18" class="text-green-700" />
  {:else}
    <Icon icon="sw360-check-circle" height="18" class="text-red-700" />
  {/if}
</div>
