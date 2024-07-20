<script lang="ts">
	import { HOLD_USAGE, type Hold } from './types';

	export let hold: Hold;
	export let imgScale: { x: number; y: number };

	$: x = hold.x * imgScale.x;
	$: y = hold.y * imgScale.y;
</script>

<button
	on:click
	style="top: {y}px; left: {x}px; width: {imgScale.x * 4}em; height: {imgScale.y * 4}em;"
	class="absolute border-[1px] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors transition-border duration-50 select-none"
	class:bg-indigo-300={hold.usage === HOLD_USAGE.inbetween}
	class:border-indigo-500={hold.usage === HOLD_USAGE.inbetween}
	class:bg-lime-300={hold.usage === HOLD_USAGE.start}
	class:border-lime-500={hold.usage === HOLD_USAGE.start}
	class:bg-rose-300={hold.usage === HOLD_USAGE.finish}
	class:border-rose-500={hold.usage === HOLD_USAGE.finish}
	class:border-[0.25em]={hold.usage !== HOLD_USAGE.not_included}
	class:bg-opacity-20={hold.usage !== HOLD_USAGE.not_included}
	class:border-solid={hold.usage !== HOLD_USAGE.not_included}
	class:border-dotted={hold.usage === HOLD_USAGE.not_included}
	class:bg-stone-50={hold.usage === HOLD_USAGE.not_included}
	class:bg-opacity-30={hold.usage === HOLD_USAGE.not_included}
	class:border-stone-800={hold.usage === HOLD_USAGE.not_included}
/>

<span
	class="absolute transform -translate-x-1/2 -translate-y-1/2 align-middle"
	style="top: {y}px; left: {x}px; font-size: {imgScale.x * 1.5}em;"
>
	{#if hold.restriction === 'hands'}
		🖐️
	{:else if hold.restriction === 'feet'}
		🦶
	{/if}
</span>
