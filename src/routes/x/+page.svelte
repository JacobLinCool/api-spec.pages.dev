<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import "swagger-ui-dist/swagger-ui.css";

	export let data;

	let node: HTMLDivElement;

	onMount(async () => {
		if (!data.spec) {
			await goto("/");
		}
		console.log(data.spec);
		render();
	});

	async function render() {
		const { SwaggerUIBundle } = await import("swagger-ui-dist");
		SwaggerUIBundle({
			spec: data.spec,
			domNode: node,
			deepLinking: true,
			presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
			plugins: [SwaggerUIBundle.plugins.DownloadUrl],
		});
	}
</script>

<svelte:head>
	{#if data.spec.info}
		<title>{data.spec.info.title}</title>
		<meta name="description" content={data.spec.info.description || ""} />
	{:else}
		<title>API Documentation</title>
		<meta name="description" content="API Documentation" />
	{/if}
</svelte:head>

<div class="h-full w-full overflow-auto" bind:this={node} />
