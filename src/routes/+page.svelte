<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { t } from "svelte-i18n";

	let url = "https://woj.csie.cool/api/openapi.json";
	$: ok = check(url);

	let waiting = false;
	async function go(): Promise<void> {
		if (waiting || !ok) {
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

	function check(url: string): boolean {
		try {
			const u = new URL(url);
			if (!u.protocol.startsWith("http")) {
				throw new Error();
			}
			return true;
		} catch (err) {
			return false;
		}
	}
</script>

<svelte:head>
	<title>{$t("welcome")}</title>
	<meta name="description" content={$t("description")} />
</svelte:head>

<div class="flex h-full w-full items-center justify-center p-4">
	<div class="prose font-sans">
		<h1>{$t("welcome")}</h1>
		<p>{$t("description")}</p>
		<div class="divider" />
		<label class="label" for=""> URL to OpenAPI spec </label>
		<div class="join w-full">
			<input
				class="input-bordered input-primary input join-item flex-1"
				placeholder="https://example.com/openapi.json"
				bind:value={url}
				class:input-error={!ok}
			/>
			<button
				class="btn-primary join-item btn rounded-r-full"
				class:animate-pulse={waiting}
				class:btn-error={!ok}
				disabled={!url || waiting || !ok}
				on:click={go}
			>
				{$t("open")}
			</button>
		</div>
	</div>
</div>
