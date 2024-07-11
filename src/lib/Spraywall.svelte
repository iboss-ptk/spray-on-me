<script lang="ts">
	import holds_json from '$lib/holds.json';
	import { HOLD_USAGE, RESTRICTION, type Hold, type Grade } from './types';
	import HoldComponent from './Hold.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Card from '$lib/components/ui/card';
	import * as Separator from '$lib/components/ui/separator';

	import { onMount } from 'svelte';
	import Textarea from './components/ui/textarea/textarea.svelte';

	let holds: Hold[] = holds_json.map((hold) => ({
		...hold,
		usage: HOLD_USAGE.not_included,
		restriction: RESTRICTION.none
	}));

	let grade: Grade = 'v0';

	let holdUsage = HOLD_USAGE.any_move;
	let restriction = RESTRICTION.none;

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
					on:click={() => {
						if (holds[index].usage === HOLD_USAGE.not_included) {
							holds[index].usage = holdUsage;
							holds[index].restriction = restriction;
						} else {
							holds[index].usage = HOLD_USAGE.not_included;
							holds[index].restriction = RESTRICTION.none;
						}
					}}
				/>
			{/each}
		{/if}
	</div>
</div>

<Separator.Root class="my-4" />

<div class="my-4">
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

	<Card.Root class="m-4">
		<Card.Header>
			<Card.Title>Restriction</Card.Title>
			<Card.Description>Determine the restriction for the selected hold.</Card.Description>
		</Card.Header>
		<Card.Content>
			<ToggleGroup.Root type="single" bind:value={restriction}>
				<ToggleGroup.Item value={RESTRICTION.none}>none</ToggleGroup.Item>
				<ToggleGroup.Item value={RESTRICTION.hands}>🙌 hands</ToggleGroup.Item>
				<ToggleGroup.Item value={RESTRICTION.feet}>👟 feet</ToggleGroup.Item>
			</ToggleGroup.Root>
		</Card.Content>
	</Card.Root>
</div>

<div class="my-4">
	<h2 class="text-xl font-bold m-4">Route Info</h2>

	<Card.Root class="m-6">
		<Card.Header>
			<Card.Title>Grade</Card.Title>
			<Card.Description>Climbing grade for this route.</Card.Description>
		</Card.Header>
		<Card.Content>
			<ToggleGroup.Root class="flex-wrap" type="single" bind:value={grade}>
				{#each ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16', 'v17', 'v18', 'v19', 'v20'] as gradeValue}
					<ToggleGroup.Item value={gradeValue}>
						{gradeValue}
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
		</Card.Content>
	</Card.Root>

	<Card.Root class="m-6">
		<Card.Header>
			<Card.Title>Description</Card.Title>
			<Card.Description
				>Describe the route, how to use, additional restrictions and any other relevant info.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<Textarea placeholder={`Eg. Crossover only, campus only`}></Textarea>
		</Card.Content>
	</Card.Root>
</div>
