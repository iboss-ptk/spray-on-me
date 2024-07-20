<script lang="ts">
	import '../app.css';
	import Spraywall from '$lib/Spraywall.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-[1024px] m-auto">
	<Spraywall routeString={data.route} mode={data.mode} />
</div>
