import { redirect } from "@sveltejs/kit";

export function fetch_doc(url?: string | null): { spec?: Promise<string>; local?: string } {
	if (!url) {
		throw redirect(302, "/");
	}

	try {
		const u = new URL(url);

		if (["localhost", "127.0.0.1", "0.0.0.0"].includes(u.hostname)) {
			return { local: url };
		}
	} catch {
		throw redirect(302, "/");
	}

	return {
		spec: fetch(url, {
			headers: {
				"User-Agent":
					"api-spec.pages.dev (https://github.com/JacobLinCool/api-spec.pages.dev)",
			},
		}).then((r) => r.text()),
	};
}
