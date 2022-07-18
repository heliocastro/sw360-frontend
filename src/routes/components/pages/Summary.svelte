<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  export let component
  import InfoCell from '$lib/components/InfoCell.svelte'
  import { sw360id } from '$lib/utils'
</script>

<div class="text-justify text-base">{component.description}</div>
<br />
<div class="sw360-navy-bg-text">General</div>
<InfoCell>
  <div>Id:</div>
  <div>{sw360id(component)}</div>
</InfoCell>

<InfoCell>
  <div>Name:</div>
  <div>{component.name}</div>
</InfoCell>

<InfoCell>
  <div>Created on:</div>
  <div>{component.createdOn}</div>
</InfoCell>

<InfoCell>
  <div>Created by:</div>
  <div>{component._embedded.createdBy.email}</div>
</InfoCell>

<InfoCell>
  <div>Categories:</div>
  {#each component.categories as cat}
    {cat},&nbsp;
  {/each}
</InfoCell>

<InfoCell>
  <div>Component Type:</div>
  <div>{component.componentType}</div>
</InfoCell>

<InfoCell>
  <div>Default Vendor:</div>
  <div>{component.defaultVendorId}</div>
</InfoCell>
<InfoCell>
  <div>Homepage:</div>
  <div><a href={component.homepage}>{component.homepage}</a></div>
</InfoCell>

<InfoCell>
  <div>Blog:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>Wiki:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>Mailing List:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>External Ids:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>Additional Data:</div>
  <div />
</InfoCell>

<br />

<div class="sw360-navy-bg-text">Release Aggregate Data</div>

<InfoCell>
  <div>Vendors:</div>
</InfoCell>

<InfoCell>
  <div>Languages:</div>
</InfoCell>

<InfoCell>
  <div>Platforms:</div>
</InfoCell>

<InfoCell>
  <div>Operating Systems:</div>
</InfoCell>

<InfoCell>
  <div>Main Licenses:</div>
</InfoCell>

<br />

<div class="sw360-navy-bg-text">Roles</div>

<InfoCell>
  <div>Component Owner:</div>
  <div>{component.componentOwner}</div>
</InfoCell>

<InfoCell>
  <div>Owner Account Unit:</div>
</InfoCell>

<InfoCell>
  <div>Owner Billing Group:</div>
</InfoCell>

<InfoCell>
  <div>Owner Country:</div>
  <div>{component.ownerCountry}</div>
</InfoCell>

<InfoCell>
  <div>Moderators:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>Subscribers:</div>
  <div />
</InfoCell>

<InfoCell>
  <div>Additional Roles:</div>
  <div />
</InfoCell>
