<script>
  import { loginForm } from "$lib/stores/index";
  import Input from "$lib/components/Input.svelte";
</script>
<div>
  <Input label="Email Address" bind:value={$loginForm.email} />
  <Input label="Last Name" bind:value={$loginForm.password} />
</div>
