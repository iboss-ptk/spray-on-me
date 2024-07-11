export type HoldType = 'not_included' | 'any_move' | 'start' | 'finish';

export const HOLD_USAGE: { [key in HoldType]: HoldType } = {
	not_included: 'not_included',
	any_move: 'any_move',
	start: 'start',
	finish: 'finish'
};

export type Restriction =
	| 'none'
	| 'hands'
	| 'feet'
	| 'left_foot'
	| 'right_foot'
	| 'left_hand'
	| 'right_hand';

export const RESTRICTION: { [key in Restriction]: Restriction } = {
	none: 'none',
	hands: 'hands',
	feet: 'feet',
	left_foot: 'left_foot',
	right_foot: 'right_foot',
	left_hand: 'left_hand',
	right_hand: 'right_hand'
};

export type Hold = {
	x: number;
	y: number;
	type: HoldType;
};
