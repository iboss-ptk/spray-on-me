<script lang="ts">
	import holds_json from '$lib/holds.json';
	import { HOLD_USAGE, RESTRICTION, type Hold, type Grade, type Route } from './types';
	import HoldComponent from './Hold.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Card from '$lib/components/ui/card';
	import * as Separator from '$lib/components/ui/separator';

	import { onMount } from 'svelte';
	import Textarea from './components/ui/textarea/textarea.svelte';
	import Input from './components/ui/input/input.svelte';
	import Button from './components/ui/button/button.svelte';

	export let routeString: string | null;
	export let mode: string | null;

	let route: Route = {
		holds: holds_json.map((hold) => ({
			...hold,
			usage: HOLD_USAGE.not_included,
			restriction: RESTRICTION.none
		})),
		routeName: '',
		settter: '',
		grade: 'v0',
		description: ''
	};

	if (routeString) {
		route = decodeRoute(routeString);
	}

	let holds: Hold[] = route.holds;

	let routeName = route.routeName;
	let settter = route.settter;
	let grade: Grade = route.grade;
	let description = route.description;

	let holdUsage = HOLD_USAGE.start;
	let restriction = RESTRICTION.none;

	let img: HTMLImageElement;
	let imgScale: { x: number; y: number } | null = null;

	function encodeRoute() {
		const route: Route = {
			holds: holds.filter((hold) => hold.usage !== HOLD_USAGE.not_included),
			routeName,
			settter,
			grade,
			description
		};

		return encodeURIComponent(btoa(JSON.stringify(route)));
	}

	function decodeRoute(route: string): Route {
		const decoded = atob(decodeURIComponent(route));
		const decodedRoute = JSON.parse(decoded);

		const mergedHolds = holds_json.map((hold) => {
			const matchedHold = decodedRoute.holds.find(
				(decodedHold: Hold) => decodedHold.x === hold.x && decodedHold.y === hold.y
			);
			return matchedHold
				? { ...hold, ...matchedHold }
				: {
						...hold,
						usage: HOLD_USAGE.not_included,
						restriction: RESTRICTION.none
					};
		});
		decodedRoute.holds = mergedHolds;

		return decodedRoute;
	}

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
				{#if mode === 'edit' || hold.usage !== HOLD_USAGE.not_included}
					{#if mode === 'edit'}
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
					{:else}
						<HoldComponent {hold} {imgScale} />
					{/if}
				{/if}
			{/each}
		{/if}
	</div>
</div>

{#if mode === 'edit'}
	<div class="my-4">
		<Card.Root class="m-4">
			<Card.Header>
				<Card.Title>Usage</Card.Title>
				<Card.Description
					>Determine if the selecting hold is used for start, inbetween or finish.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<ToggleGroup.Root type="single" bind:value={holdUsage}>
					<ToggleGroup.Item value={HOLD_USAGE.start}>
						<div class="bg-lime-300 w-2 h-2 rounded-full p-2 mr-2" />
						start
					</ToggleGroup.Item>
					<ToggleGroup.Item value={HOLD_USAGE.inbetween}>
						<div class="bg-indigo-300 w-2 h-2 rounded-full p-2 mr-2" />
						inbetween
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

	<Separator.Root class="my-4" />

	<div class="my-4">
		<h2 class="text-xl font-bold m-4">Route Info</h2>

		<Card.Root class="m-6">
			<Card.Header>
				<Card.Title>Route Name</Card.Title>
			</Card.Header>
			<Card.Content>
				<Input bind:value={routeName} />
			</Card.Content>
		</Card.Root>

		<Card.Root class="m-6">
			<Card.Header>
				<Card.Title>Setter</Card.Title>
			</Card.Header>
			<Card.Content>
				<Input bind:value={settter} />
			</Card.Content>
		</Card.Root>

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
				<Textarea
					bind:value={description}
					placeholder={`Eg. Crossover only, campus only, all holds are footholds`}
				></Textarea>
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="my-4">
		<Card.Root class="m-6">
			<Card.Header>
				<Card.Title
					>{#if routeName}
						{routeName}
					{:else}
						<span class="font-normal italic">untitled</span>
					{/if} - ({grade})</Card.Title
				>
			</Card.Header>
			<Card.Content>
				<p>{description}</p>
				<p class="mt-5 text-xs text-right text-gray-500 italic">setter: {settter}</p>
			</Card.Content>
		</Card.Root>
	</div>
{/if}

<div class="container my-8 flex justify-between">
	<Button
		on:click={() => {
			const encodedRoute = encodeRoute();
			navigator.clipboard.writeText(`${window.location.origin}/?route=${encodedRoute}`);
		}}>Copy Link</Button
	>
	<span></span>
	<Button
		on:click={() => {
			mode = mode === 'edit' ? 'view' : 'edit';
		}}>{mode === 'edit' ? 'preview' : 'edit'}</Button
	>
</div>
