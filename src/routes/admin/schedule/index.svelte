<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/ -->
<script context="module" lang="ts">
  export async function load({ session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    return {
      props: {}
    }
  }
</script>

<script lang="ts">
  import ComponentHeader from '$lib/components/ComponentHeader.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'

  const name = 'Schedule'
  const parent = 'Admin'
</script>

<PageHeader {name} {parent} />

<div class="sw360-gridpanel">
  <div class="sw360-gridpanel-content-full">
    <ComponentHeader name="SCHEDULE TASK ADMINISTRATION">
      <button class="sw360-button bg-red-600 hover:bg-red-800 text-white hover:text-white disabled"
        >Cancel all Scheduled Tasks</button
      >
    </ComponentHeader>
    <div class="col-span-2 grid grid-cols-[20%_35%]">
      <div class="sw360-navy-text col-span-2">CVE-SEARCH</div>

      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Schedule Offset</div>
      <div class="sw360-text border-gray-200 border-t border-b">00:00:00 (hh:mm:ss)</div>

      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Interval</div>
      <div class="sw360-text border-gray-200 border-t border-b">24:00:00 (hh:mm:ss)</div>

      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Next Synchronization</div>
      <div class="sw360-text border-gray-200 border-t border-b">Fri Apr 01 00:00:00 GMT 2022</div>
    </div>
    <div class="col-span-2"><button class="sw360-button">Schedule CVE Service</button></div>
    <div class="col-span-2 grid grid-cols-[20%_35%]">
      <div class="sw360-navy-text col-span-2">Attachment Deletion From Local FS</div>
      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Schedule Offset</div>
      <div class="sw360-text border-gray-200 border-t border-b">00:00:00 (hh:mm:ss)</div>

      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Interval</div>
      <div class="sw360-text border-gray-200 border-t border-b">24:00:00 (hh:mm:ss)</div>

      <div class="sw360-navy-bg-text border-gray-200 border-t border-b">Next Synchronization</div>
      <div class="sw360-text border-gray-200 border-t border-b">Fri Apr 01 00:00:00 GMT 2022</div>
    </div>
    <div class="col-span-2">
      <button class="sw360-button">Schedule Attachment Deletion From Local FS</button>
    </div>
  </div>
</div>
