<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  import { onMount } from 'svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import RadioButton from '$lib/components/RadioButton.svelte'
  import Summary from './pages/Summary.svelte'
  import ReleaseOverview from './pages/ReleaseOverview.svelte'
  import Changelog from './pages/Changelog.svelte'

  export let component
  export let changelog

  let options = 'Summary'
  let name = component.name ? component.name : 'Component'
  let parent = 'Components'

  function nl2br(str) {
    let data = str.replace(/(?:\r\n|\r|\n)/g, '<br>')
    return data
  }
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <div>
    <div class="grid grid-cols-1 bg-white border border-gray-200 rounded w-full text-gray-500">
      <RadioButton value="Summary" bind:options>Summary</RadioButton>
      <RadioButton value="ReleaseOverview" bind:options>Release Overview</RadioButton>
      <RadioButton value="Attachments" bind:options>Attachments</RadioButton>
      <RadioButton value="Vulnerabilities" bind:options>Vulnerabilities</RadioButton>
      <RadioButton value="Changelog" bind:options>Changelog</RadioButton>
    </div>
  </div>

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader {name}>
      <button class="sw360-button">Edit Component</button>
      <button class="sw360-button-reverse">Merge</button>
      <button class="sw360-button-reverse">Split</button>
      <button class="sw360-button-reverse text-green-700">Subscribe</button>
    </ComponentHeader>

    <div class="col-span-2 grid grid-cols-1">
      {#if options == 'Summary'}
        <Summary {component} />
      {:else if options == 'ReleaseOverview'}
        <ReleaseOverview {component} />
      {:else if options == 'Changelog'}
        <Changelog {changelog} />
      {/if}
    </div>
  </div>
</div>
