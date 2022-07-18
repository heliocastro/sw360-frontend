<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  import Icon from '@iconify/svelte'
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import InfoCell from '$lib/components/InfoCell.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import RadioButton from '$lib/components/RadioButton.svelte'

  export let license

  let options = 'Details'
  let name = license.shortName ? license.shortName : 'License'
  let parent = 'Licenses'

  function nl2br(str) {
    let data = str.replace(/(?:\r\n|\r|\n)/g, '<br>')
    return data
  }
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <div>
    <div class="grid grid-cols-1 bg-white border border-gray-200 rounded w-full text-gray-500">
      <RadioButton value="Details" bind:options>Details</RadioButton>
      <RadioButton value="Text" bind:options>Text</RadioButton>
      <RadioButton value="Obligations" bind:options>Obligations</RadioButton>
    </div>
  </div>

  <div class="sw360-gridpanel-content-r">
    <ComponentHeader name="{license.fullName} ({license.shortName})">
      <button class="sw360-button">Edit License</button>
    </ComponentHeader>

    <div class="col-span-2 grid grid-cols-1">
      {#if options == 'Details'}
        <div class="sw360-navy-bg-text">License Details</div>
        <InfoCell>
          <div>Fullname:</div>
          <div>{license.fullName}</div>
        </InfoCell>

        <InfoCell>
          <div>Shortname:</div>
          <div>{license.shortName}</div>
        </InfoCell>

        <InfoCell>
          <div>Is Checked:</div>
          <Icon icon="sw360-check-circle" class="text-green-700" />
        </InfoCell>

        <InfoCell>
          <div>Type:</div>
          <div />
        </InfoCell>

        <InfoCell>
          <div>OSI Approved?:</div>
          <div>
            {#if license.OSIApproved !== 'NA'}
              <Icon icon="sw360-check-circle" class="text-green-700" />
            {:else}
              <Icon icon="sw360-check-circle" class="text-red-700" />
            {/if}
          </div>
        </InfoCell>

        <InfoCell>
          <div>FSF Free/Libre?:</div>
          {#if license.OSIApproved !== 'NA'}
            <Icon icon="sw360-check-circle" class="text-green-700" />
          {:else}
            <Icon icon="sw360-check-circle" class="text-red-700" />
          {/if}
        </InfoCell>

        <InfoCell>
          <div class="place-self-center justify-self-start">
            External link for more information:
          </div>
          <div class="flex gap-3 items-center">
            <input type="text" class="form-control px-2 h-10 border rounded" />
            <button class="sw360-button-reverse">Save</button>
          </div>
        </InfoCell>
      {:else if options == 'Text'}
        <div class="col-span-2 sw360-navy-bg-text">License Text</div>
        <div class="col-span-2 px-3 py-3 border border-gray-200 w-full">
          {@html nl2br(license.text)}
        </div>
      {/if}
    </div>
  </div>
</div>
