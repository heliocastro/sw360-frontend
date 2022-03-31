<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  import { goto } from '$app/navigation'

  export let label
  export let link
  export let active

  // icons
  import IconAngleDown from '$lib/icons/angle-down.svg'

  let items = [
    { label: 'User', link: '/admin/user' },
    { label: 'Vendors', link: '/admin/vendors' },
    { label: 'Bulk Release Edit', link: '/admin/bulk' },
    { label: 'Licenses', link: '/admin/licenses' },
    { label: 'License Types', link: '/admin/licensetypes' },
    { label: 'Obligations', link: '/admin/obligations' },
    { label: 'Schedule', link: '/admin/schedule' },
    { label: 'Fossology', link: '/admin/fossology' },
    { label: 'Database Sanitation', link: '/admin/database' },
    { label: 'Attachment Cleanup', link: '/admin/attachment' },
    { label: 'OAuth Client', link: '/admin/oauth' }
  ]

  function onClick() {
    goto(link)
  }
</script>

<div class="py-2 relative dropdown">
  <input type="radio" value={label} checked={active} on:click={onClick} class="hidden peer" />
  <div
    class="text-left text-gray-500 font-bold text-base pb w-full peer-checked:text-black peer-checked:text-black transition duration-150 ease-in-out peer-checked:border-b-2 peer-checked:border-sw360-orange cursor-pointer"
    id="menu-button"
    aria-expanded="true"
    aria-haspopup="true"
  >
    <div class="flex gap-1">
      <div>{label}</div>
      <div class="w-3 place-self-center"><IconAngleDown /></div>
    </div>
  </div>
  <ul class="dropdown-menu rounded bg-white shadow-md absolute hidden container w-48 pt-1 z-50">
    {#each items as item}
      <li class="">
        <a class="hover:bg-sw360-paleorange text-gray-500 py-2 px-4 block" href={item.link}
          >{item.label}</a
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  .dropdown:hover .dropdown-menu {
    display: block;
  }
</style>
