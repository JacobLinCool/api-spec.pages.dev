import { locale, waitLocale } from "svelte-i18n";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get("accept-language")?.split(",")[0] || "en";
	locale.set(lang);
	await waitLocale(lang);

	const result = await resolve(event);
	return result;
};
