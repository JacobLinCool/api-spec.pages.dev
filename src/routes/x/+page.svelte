<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import "swagger-ui-dist/swagger-ui.css";
	import YAML from "js-yaml";

	export let data;

	let node: HTMLDivElement;
	let spec = checkout(data.spec);

	onMount(async () => {
		if (!spec) {
			await goto("/");
		}
		console.log(spec);
		render();
	});

	function checkout(raw: string): any {
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

	async function render() {
		const { SwaggerUIBundle } = await import("swagger-ui-dist");
		SwaggerUIBundle({
			spec,
			domNode: node,
			deepLinking: true,
			presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
			plugins: [SwaggerUIBundle.plugins.DownloadUrl],
		});
	}
</script>

<svelte:head>
	<title>{spec.info.title}</title>
	<meta name="description" content={spec.info.description || ""} />
</svelte:head>

<div class="h-full w-full overflow-auto" bind:this={node} />
