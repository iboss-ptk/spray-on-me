export type HoldUsage = 'not_included' | 'any_move' | 'start' | 'finish';

export const HOLD_USAGE: { [key in HoldUsage]: HoldUsage } = {
	not_included: 'not_included',
	any_move: 'any_move',
	start: 'start',
	finish: 'finish'
};

export type Restriction = 'none' | 'hands' | 'feet';

export const RESTRICTION: { [key in Restriction]: Restriction } = {
	none: 'none',
	hands: 'hands',
	feet: 'feet'
};

export type Hold = {
	x: number;
	y: number;
	usage: HoldUsage;
	restriction: Restriction;
};
