<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script context="module">
  export const prerender = true

  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: '/'
      }
    }
    return {}
  }
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import { post } from '$lib/utils'
  import ListErrors from '$lib/ListErrors.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { SW360_DEV_EMAIL, SW360_DEV_PASSWORD } from '$lib/env'

  let email = SW360_DEV_EMAIL ? SW360_DEV_EMAIL : ''
  let password = SW360_DEV_PASSWORD ? SW360_DEV_PASSWORD : ''
  let errors = null
  let name = 'Login'

  async function submit() {
    const response = await post(`auth/login`, { email, password })

    if (response) {
      $session['user'] = response
      goto('/')
    }
  }
</script>

<PageHeader {name} />
<div>
  <div class="mx-14 my-20 rounded-md p-7 bg-gray-100">
    <div class="text-4xl mt-7 mb-5">Welcome to SW360!</div>
    <div class="text-lg text-justify">
      SW360 is an open source software project that provides both a web application and a repository
      to collect, organize and make available information about software components. It establishes
      a central hub for software components in an organization.
    </div>
    <div class="my-5" />
    <div class="text-lg font-bold">
      In order to go ahead, please sign in or create a new account!
    </div>
    <ListErrors {errors} />
    <form on:submit|preventDefault={submit}>
      <span class="grid mt-2">
        <label class="block text-balck text-sm font-bold mb-2" for="password">
          Email Address
        </label>
        <input
          class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
          id="email"
          bind:value={email}
        />
      </span>
      <span class="grid mt-2">
        <label class="block text-balck text-sm font-bold mb-2" for="password"> Password </label>
        <input
          class="bg-gray-50 block w-full border border-gray-200 text-black p-2 rounded focus:bg-sw360-focus focus:border-sw360-orange focus:border-4"
          id="password"
          type="password"
          required
          bind:value={password}
        />
      </span>

      <button class="sw360-button" type="submit">Sign-In</button>
    </form>
  </div>
</div>
