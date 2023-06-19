<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { t } from "svelte-i18n";

	let url = "https://woj.csie.cool/api/openapi.json";

	let waiting = false;
	async function go() {
		if (waiting) {
			return;
		}
		waiting = true;

		try {
			if (url) {
				const target = new URL("/x", $page.url);
				target.searchParams.set("url", url);
				console.log({ target });
				await goto(target);
			}
		} catch (err) {
			console.error(err);
		} finally {
			waiting = false;
		}
	}
</script>

<svelte:head>
	<title>{$t("welcome")}</title>
	<meta name="description" content={$t("description")} />
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<div class="prose">
		<h1>{$t("welcome")}</h1>
		<p>{$t("description")}</p>
		<div class="divider" />
		<label class="label" for=""> URL to OpenAPI spec </label>
		<div class="join w-full">
			<input
				class="input-bordered input-primary input join-item flex-1"
				placeholder="https://example.com/openapi.json"
				bind:value={url}
			/>
			<button
				class="btn-primary join-item btn rounded-r-full"
				class:animate-pulse={waiting}
				disabled={!url || waiting}
				on:click={go}
			>
				{$t("open")}
			</button>
		</div>
	</div>
</div>
