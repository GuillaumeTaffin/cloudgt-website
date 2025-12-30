<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';

	interface Tool {
		name: string;
		description: string;
		installCommand: string;
		link?: string;
	}

	const tools: Tool[] = [
		{
			name: 'Mole CLI',
			description:
				'A CLI tool for managing SSH tunnels and local development environments. Simplifies connecting to remote databases and services through secure tunnels.',
			installCommand: 'brew install davrodpin/mole/mole',
			link: 'https://github.com/davrodpin/mole'
		},
		{
			name: 'GitHub CLI',
			description:
				'Official GitHub command-line tool. Manage pull requests, issues, repositories, and more directly from your terminal.',
			installCommand: 'brew install gh',
			link: 'https://cli.github.com/'
		}
	];

	let copiedIndex = $state<number | null>(null);

	async function copyToClipboard(text: string, index: number) {
		await navigator.clipboard.writeText(text);
		copiedIndex = index;
		setTimeout(() => {
			copiedIndex = null;
		}, 2000);
	}
</script>

<svelte:head>
	<title>Dev Setup - Guillaume Taffin</title>
</svelte:head>

<div class="container mx-auto max-w-screen-xl px-4 py-12 md:py-24">
	<section class="text-center">
		<h1 class="text-4xl font-bold tracking-tight">Dev Setup</h1>
		<p class="mt-4 text-lg text-muted-foreground">Tools and utilities I use for development</p>
	</section>

	<div class="mt-12 grid gap-6 md:grid-cols-2">
		{#each tools as tool, index (tool.name)}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center justify-between">
						{tool.name}
						{#if tool.link}
							<a
								href={tool.link}
								target="_blank"
								rel="noopener noreferrer"
								class="text-muted-foreground transition-colors hover:text-foreground"
							>
								<ExternalLink class="h-4 w-4" />
							</a>
						{/if}
					</Card.Title>
					<Card.Description>{tool.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex items-center gap-2">
						<code class="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
							{tool.installCommand}
						</code>
						<Button
							variant="outline"
							size="sm"
							onclick={() => copyToClipboard(tool.installCommand, index)}
						>
							{#if copiedIndex === index}
								<Check class="h-4 w-4" />
							{:else}
								<Copy class="h-4 w-4" />
							{/if}
						</Button>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
