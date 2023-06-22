import { fetch_doc } from "$lib/server/fetch-doc";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
	return fetch_doc(url.searchParams.get("url"));
}) satisfies PageServerLoad;
