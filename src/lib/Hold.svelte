<script lang="ts">
	import { HOLD_USAGE, type Hold } from './types';

	export let hold: Hold;
	export let imgScale: { x: number; y: number };

	$: x = hold.x * imgScale.x;
	$: y = hold.y * imgScale.y;
</script>

<button
	on:click
	class="absolute border-[1px] border-stone-800 bg-stone-50 opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors transition-border duration-50 select-none"
	style="top: {y}px; left: {x}px; width: {imgScale.x * 2}em; height: {imgScale.y * 2}em;"
	class:bg-indigo-300={hold.type === HOLD_USAGE.any_move}
	class:bg-lime-300={hold.type === HOLD_USAGE.start}
	class:bg-rose-300={hold.type === HOLD_USAGE.finish}
	class:opacity-80={hold.type !== HOLD_USAGE.not_included}
	class:border-solid={hold.type !== HOLD_USAGE.not_included}
	class:border-dotted={hold.type === HOLD_USAGE.not_included}
>
</button>
