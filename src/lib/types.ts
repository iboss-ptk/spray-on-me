export type HoldUsage = 'not_included' | 'inbetween' | 'start' | 'finish';

export const HOLD_USAGE: { [key in HoldUsage]: HoldUsage } = {
	not_included: 'not_included',
	inbetween: 'inbetween',
	start: 'start',
	finish: 'finish'
};

export type Grade =
	| 'v0'
	| 'v1'
	| 'v2'
	| 'v3'
	| 'v4'
	| 'v5'
	| 'v6'
	| 'v7'
	| 'v8'
	| 'v9'
	| 'v10'
	| 'v11'
	| 'v12'
	| 'v13'
	| 'v14'
	| 'v15'
	| 'v16'
	| 'v17'
	| 'v18'
	| 'v19'
	| 'v20';

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

export type Route = {
	holds: Hold[];
	routeName: string;
	settter: string;
	grade: Grade;
	description: string;
};
