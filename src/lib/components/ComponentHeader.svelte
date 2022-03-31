<!--
Copyright (c) 2022 Helio Chissini de Castro

This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0 -->
<script lang="ts">
  export let total = null
  export let name = ''
</script>

<div class="flex gap-2 content-center">
  <slot />
</div>
<div class="text-right text-2xl text-sw360-grey place-self-end self-center uppercase">
  {name}{#if total !== null}: ({total}){/if}
</div>
