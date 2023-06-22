import { browser } from "$app/environment";
import { checkout } from "$lib/checkout";
import type { PageLoad } from "./$types";

export const load = (async ({ data }) => {
	const spec = await checkout(data);
	console.log({ browser, spec });
	return { spec: spec || data };
}) satisfies PageLoad;
