<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

	export let row;
	export let column;
	export let cell;
</script>

<Fa icon={faCheckCircle} color="green" />
