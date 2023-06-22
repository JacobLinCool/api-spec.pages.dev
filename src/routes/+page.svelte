<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { t } from "svelte-i18n";

	let url = "https://woj.csie.cool/api/openapi.json";
	$: ok = check(url);

	const types = {
		SwaggerUI: "x",
		RapiDoc: "rapidoc",
	};
	let type = types.SwaggerUI;

	$: target = make_target(type, url);

	let waiting = false;
	async function go(): Promise<void> {
		if (waiting || !ok) {
			return;
		}
		waiting = true;

		try {
			console.log({ target });
			await goto(target);
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

	function make_target(type: string, url: string) {
		const target = new URL(`/${type}`, $page.url);
		target.searchParams.set("url", url);
		return target;
	}

	let copied = false;
	async function copy() {
		await navigator.clipboard.writeText(target.toString());
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>{$t("welcome")}</title>
	<meta name="description" content={$t("description")} />
</svelte:head>

<div class="flex h-full w-full items-center justify-center p-4">
	<div class="prose w-full font-sans">
		<h1>{$t("welcome")}</h1>
		<p>{$t("description")}</p>
		<div class="divider" />
		<label class="label" for=""> URL to OpenAPI spec </label>
		<div class="join w-full max-md:flex max-md:flex-col max-md:gap-2">
			<input
				class="input-bordered input-primary input md:join-item md:flex-1"
				placeholder="https://example.com/openapi.json"
				bind:value={url}
				class:input-error={!ok}
			/>

			<select class="select-bordered select-primary select md:join-item" bind:value={type}>
				{#each Object.entries(types) as [key, value]}
					<option {value}>{key}</option>
				{/each}
			</select>

			<button
				class="btn-primary btn md:join-item md:rounded-r-full"
				class:animate-pulse={waiting}
				class:btn-error={!ok}
				disabled={!url || waiting || !ok}
				on:click={go}
			>
				{$t("open")}
			</button>
		</div>

		{#if ok}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="alert tooltip mt-4 max-w-full cursor-pointer"
				class:tooltip-success={copied}
				data-tip={copied ? $t("copied") : $t("click-to-copy")}
				on:click={copy}
			>
				<div class="overflow-x-auto">
					<span>{target}</span>
				</div>
			</div>
		{/if}
	</div>
</div>
