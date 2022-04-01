<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  export let state = 'ACTIVE'
  export let clearingState = 'OPEN'

  // Workaround over the Gridjs Bug
  export let cell
  cell = null
  export let row
  row = null
  export let column
  column = null

  let psColor = null
  let csColor = null

  switch (state) {
    case 'ACTIVE':
      psColor = 'green-500'
      break
    default:
      psColor = 'gray-500'
      break
  }

  switch (clearingState) {
    case 'OPEN':
      csColor = 'red-500'
      break
    case 'CLOSED':
      csColor = 'green-500'
      break
    case 'IN_PROGRESS':
      csColor = 'yellow-600'
      break
  }
</script>

<div class="flex justify-center font-bold text-white text-normal">
  <span class="py-0.5 px-1.5 rounded-l-md bg-{psColor}">PS</span>
  <span class="py-0.5 px-1.5 rounded-r-md bg-{csColor}">CS</span>
</div>
