import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, fetch }) => {
	const t = url.searchParams.get("url");
	if (!t) {
		throw redirect(302, "/");
	}

	try {
		new URL(t);
	} catch {
		throw redirect(302, "/");
	}

	return {
		spec: fetch(t).then((r) => r.text()),
	};
}) satisfies PageServerLoad;
