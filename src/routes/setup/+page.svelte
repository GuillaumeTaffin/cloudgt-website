<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';
	import Terminal from '@lucide/svelte/icons/terminal';

	interface InstallStep {
		label: string;
		command: string;
	}

	interface Tool {
		name: string;
		description: string;
		installCommand?: string;
		installSteps?: InstallStep[];
		link?: string;
	}

	const tools: Tool[] = [
		{
			name: 'Homebrew',
			description:
				'The missing package manager for macOS (or Linux). Install the tools you need that Apple (or your Linux system) didn\'t.',
			installCommand:
				'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
			link: 'https://brew.sh/'
		},
		{
			name: 'Stow',
			description:
				'GNU Stow is a symlink farm manager. Perfect for managing dotfiles and configuration files across multiple tools and projects.',
			installCommand: 'brew install stow',
			link: 'https://formulae.brew.sh/formula/stow'
		},
		{
			name: 'Doppler CLI',
			description:
				'Secure secret management for developers. Inject environment variables and sync secrets across your team and environments.',
			installSteps: [
				{ label: 'Install GnuPG', command: 'brew install gnupg' },
				{ label: 'Install Doppler', command: 'brew install dopplerhq/cli/doppler' }
			],
			link: 'https://docs.doppler.com/docs/cli'
		},
		{
			name: 'Mole',
			description:
				'A simple tool to help you claw through your files at the speed of light. Fast file search and navigation from the terminal.',
			installCommand: 'brew install tw93/tap/mole',
			link: 'https://github.com/tw93/Mole'
		},
		{
			name: 'GitHub CLI',
			description:
				'Official GitHub command-line tool. Manage pull requests, issues, repositories, and more directly from your terminal.',
			installCommand: 'brew install gh',
			link: 'https://cli.github.com/'
		},
		{
			name: 'Zed',
			description:
				'A high-performance, multiplayer code editor built in Rust. Designed for speed and collaboration with AI assistance built-in.',
			installCommand: 'brew install --cask zed',
			link: 'https://zed.dev/'
		}
	];

	let copiedKey = $state<string | null>(null);

	async function copyToClipboard(text: string, key: string) {
		await navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => {
			copiedKey = null;
		}, 2000);
	}
</script>

<svelte:head>
	<title>Dev Setup - Guillaume Taffin</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-6 py-16 md:py-24">
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
				<Terminal class="h-5 w-5 text-primary" />
			</div>
			<span class="font-mono-display text-sm tracking-wide text-muted-foreground">~/setup</span>
		</div>
		<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Dev Setup</h1>
		<p class="mt-3 text-lg text-muted-foreground">
			Tools and utilities I use for development.
		</p>
	</header>

	<!-- Tools List -->
	<div class="space-y-0">
		{#each tools as tool, index (tool.name)}
			<article
				class="group py-8 {index > 0 ? 'border-t border-border/50' : ''}"
				style="animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) {index * 0.1}s both"
			>
				<!-- Tool Header -->
				<div class="mb-4 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<h2 class="text-xl font-medium tracking-tight">{tool.name}</h2>
						<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
							{tool.description}
						</p>
					</div>
					{#if tool.link}
						<a
							href={tool.link}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-1 flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<span class="hidden sm:inline">Docs</span>
							<ArrowUpRight class="h-4 w-4" />
						</a>
					{/if}
				</div>

				<!-- Commands -->
				<div class="space-y-3">
					{#if tool.installSteps}
						{#each tool.installSteps as step, stepIndex}
							<div class="group/cmd">
								<div class="mb-1.5 flex items-center gap-2">
									<span
										class="flex h-5 w-5 items-center justify-center rounded bg-primary/15 font-mono-display text-[10px] font-semibold text-primary"
									>
										{stepIndex + 1}
									</span>
									<span class="text-xs font-medium text-muted-foreground">{step.label}</span>
								</div>
								<div
									class="flex items-center overflow-hidden rounded-lg border border-border/40 bg-muted/30 transition-all duration-200 group-hover/cmd:border-border group-hover/cmd:bg-muted/50"
								>
									<div class="min-w-0 flex-1 overflow-x-auto">
										<code class="block whitespace-nowrap px-4 py-3 font-mono-display text-sm">
											{step.command}
										</code>
									</div>
									<Button
										variant="ghost"
										size="sm"
										class="mr-1 shrink-0 opacity-50 transition-opacity group-hover/cmd:opacity-100"
										onclick={() => copyToClipboard(step.command, `${tool.name}-${stepIndex}`)}
									>
										{#if copiedKey === `${tool.name}-${stepIndex}`}
											<Check class="h-4 w-4 text-green-500" />
										{:else}
											<Copy class="h-4 w-4" />
										{/if}
									</Button>
								</div>
							</div>
						{/each}
					{:else if tool.installCommand}
						<div
							class="group/cmd flex items-center overflow-hidden rounded-lg border border-border/40 bg-muted/30 transition-all duration-200 hover:border-border hover:bg-muted/50"
						>
							<div class="min-w-0 flex-1 overflow-x-auto">
								<code class="block whitespace-nowrap px-4 py-3 font-mono-display text-sm">
									{tool.installCommand}
								</code>
							</div>
							<Button
								variant="ghost"
								size="sm"
								class="mr-1 shrink-0 opacity-50 transition-opacity group-hover/cmd:opacity-100"
								onclick={() => copyToClipboard(tool.installCommand!, tool.name)}
							>
								{#if copiedKey === tool.name}
									<Check class="h-4 w-4 text-green-500" />
								{:else}
									<Copy class="h-4 w-4" />
								{/if}
							</Button>
						</div>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</div>
