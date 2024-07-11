<script lang="ts">
	import holds_json from '$lib/holds.json';
	import { HOLD_USAGE, type Hold } from './types';
	import HoldComponent from './Hold.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Card from '$lib/components/ui/card';

	import { onMount } from 'svelte';

	let holds: Hold[] = holds_json.map((hold) => ({ ...hold, type: HOLD_USAGE.not_included }));
	let holdUsage = HOLD_USAGE.any_move;

	let img: HTMLImageElement;
	let imgScale: { x: number; y: number } | null = null;

	onMount(() => {
		if (img) {
			updateImgScale();
		}
		window.addEventListener('resize', () => {
			if (img) {
				updateImgScale();
			}
		});
	});

	function updateImgScale() {
		if (img) {
			const scaleX = img.clientWidth / img.naturalWidth;
			const scaleY = img.clientHeight / img.naturalHeight;

			imgScale = { x: scaleX, y: scaleY };
		}
	}
</script>

<div class="flex justify-center items-center w-full h-min-full" class:opacity-0={!imgScale}>
	<div class="relative w-full" style="touch-action: manipulation;">
		<img bind:this={img} src="/wall.jpg" alt="Climbing Wall" class="w-full h-auto select-none" />

		{#if imgScale}
			{#each holds as hold, index}
				<HoldComponent
					{hold}
					{imgScale}
					on:click={() =>
						(holds[index].type =
							holds[index].type === HOLD_USAGE.not_included ? holdUsage : HOLD_USAGE.not_included)}
				/>
			{/each}
		{/if}
	</div>
</div>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Usage</Card.Title>
		<Card.Description
			>Determine if the selecting hold is used for any move, start, or finish.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<ToggleGroup.Root type="single" bind:value={holdUsage}>
			<ToggleGroup.Item value={HOLD_USAGE.any_move}>
				<div class="bg-indigo-300 w-2 h-2 rounded-full p-2 mr-2" />
				any move
			</ToggleGroup.Item>
			<ToggleGroup.Item value={HOLD_USAGE.start}>
				<div class="bg-lime-300 w-2 h-2 rounded-full p-2 mr-2" />
				start
			</ToggleGroup.Item>
			<ToggleGroup.Item value={HOLD_USAGE.finish}>
				<div class="bg-rose-300 w-2 h-2 rounded-full p-2 mr-2" />
				finish
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</Card.Content>
</Card.Root>
