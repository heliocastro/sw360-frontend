<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { page, session } from '$app/stores'
  import NavItem from '$lib/components/NavItem.svelte'
  import NavItemDropdown from '$lib/components/NavItemDropdown.svelte'
  import { POST } from '$lib/utils'

  let src = '/images/sw360.png'
  let path
  export let visible = true

  $: path = $page.url.pathname

  async function logout() {
    await POST(`/auth/logout`, null)
    $session['user'] = null
  }
</script>

<header class:visible>
  <div class="grid grid-cols-2 pl-16 items-center">
    <img class="py-6 w-36" id="sw360logo" {src} alt="SW360" />
    <div class="justify-self-end pr-16">
      {#if 'user' in $session}
        <button
          class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
          on:click={logout}
        >
          Logout
        </button>
      {/if}
    </div>

    <nav>
      {#if 'user' in $session}
        <div class="flex items-left gap-4" role="group">
          <NavItem label="Home" link="/" active={path === '/'} />
          <NavItem label="Projects" link="/projects" active={path.startsWith('/projects')} />
          <NavItem label="Components" link="/components" active={path.startsWith('/components')} />
          <NavItem label="Licenses" link="/licenses" active={path.startsWith('/licenses')} />
          <NavItem label="ECC" link="/ecc" active={path.startsWith('/ecc')} />
          <NavItem
            label="Vulnerabilities"
            link="/vulnerabilities"
            active={path.startsWith('/vulnerabilities')}
          />
          <NavItem label="Requests" link="/requests" active={path.startsWith('/requests')} />
          <NavItem label="Search" link="/search" active={path.startsWith('/search')} />
          <NavItemDropdown label="Admin" link="/admin" active={path.startsWith('/admin')} />
          <NavItem
            label="Preferences"
            link="/preferences"
            active={path.startsWith('/preferences')}
          />
        </div>
      {:else}
        <NavItem label="Welcome" link="/" active={path === '/'} />
      {/if}
    </nav>
  </div>
</header>
