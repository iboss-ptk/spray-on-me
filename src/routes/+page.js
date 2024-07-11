/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	return {
		route: url.searchParams.get('route')
	};
}
