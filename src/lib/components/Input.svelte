<script>
  //
  export let label;
  export let value;
</script>
<span class="grid mt-2">
  <label>
    {#if label}
      <span class="text-black mb-2 block font-bold text-sm">
        {label}
      </span>
    {/if}
    <input 
      class="bg-gray-50 block w-full border border-gray-200 text-gray-500 p-2 rounded focus:bg-gray-100 focus:border-sw360-orange"
      type="text" 
      bind:value>
  </label>
</span>
