<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	export let data;

	let node: HTMLElement;

	onMount(async () => {
		if (!data.spec) {
			await goto("/");
		}
		console.log(data.spec);
		render();
	});

	async function render() {
		// @ts-expect-error
		await import("rapidoc");

		for (const [key, value] of $page.url.searchParams) {
			if (key !== "url") {
				node.setAttribute(key, value);
			}
		}

		// @ts-expect-error
		node.loadSpec(data.spec);
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

<rapi-doc bind:this={node} show-header={false} render-style="view" />
