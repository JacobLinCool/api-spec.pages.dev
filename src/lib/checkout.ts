import { browser } from "$app/environment";
import YAML from "js-yaml";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function checkout(data: { spec?: string; local?: string }): Promise<any> {
	if (data.spec) {
		return _checkout(data.spec);
	}

	if (browser && data.local) {
		return fetch(data.local)
			.then((r) => r.text())
			.then(_checkout);
	}

	return null;
}

function _checkout(raw: string): unknown {
	try {
		return JSON.parse(raw);
	} catch (err) {
		console.error(err);
	}

	try {
		return YAML.load(raw);
	} catch (err) {
		console.error(err);
	}
}
