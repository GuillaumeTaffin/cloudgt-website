<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';
	import Package from '@lucide/svelte/icons/package';
	import Square from '@lucide/svelte/icons/square';
	import SquareCheck from '@lucide/svelte/icons/square-check';
	import Terminal from '@lucide/svelte/icons/terminal';
	import X from '@lucide/svelte/icons/x';

	interface InstallStep {
		label: string;
		command: string;
	}

	type TagId =
		| 'cli'
		| 'desktop-app'
		| 'package-manager'
		| 'development'
		| 'dotfiles'
		| 'security'
		| 'productivity'
		| 'version-control';

	interface Tag {
		id: TagId;
		label: string;
	}

	const availableTags: Tag[] = [
		{ id: 'cli', label: 'CLI' },
		{ id: 'desktop-app', label: 'Desktop App' },
		{ id: 'package-manager', label: 'Package Manager' },
		{ id: 'development', label: 'Development' },
		{ id: 'dotfiles', label: 'Dotfiles' },
		{ id: 'security', label: 'Security' },
		{ id: 'productivity', label: 'Productivity' },
		{ id: 'version-control', label: 'Version Control' }
	];

	interface Tool {
		name: string;
		description: string;
		installCommand?: string;
		installSteps?: InstallStep[];
		link?: string;
		tags: TagId[];
	}

	const tools: Tool[] = [
		{
			name: 'Homebrew',
			description:
				"The missing package manager for macOS (or Linux). Install the tools you need that Apple (or your Linux system) didn't.",
			installCommand:
				'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
			link: 'https://brew.sh/',
			tags: ['cli', 'package-manager']
		},
		{
			name: 'Stow',
			description:
				'GNU Stow is a symlink farm manager. Perfect for managing dotfiles and configuration files across multiple tools and projects.',
			installCommand: 'brew install stow',
			link: 'https://formulae.brew.sh/formula/stow',
			tags: ['cli', 'dotfiles']
		},
		{
			name: 'Doppler CLI',
			description:
				'Secure secret management for developers. Inject environment variables and sync secrets across your team and environments.',
			installSteps: [
				{ label: 'Install GnuPG', command: 'brew install gnupg' },
				{ label: 'Install Doppler', command: 'brew install dopplerhq/cli/doppler' }
			],
			link: 'https://docs.doppler.com/docs/cli',
			tags: ['cli', 'security']
		},
		{
			name: 'Mole',
			description:
				'A simple tool to help you claw through your files at the speed of light. Fast file search and navigation from the terminal.',
			installCommand: 'brew install tw93/tap/mole',
			link: 'https://github.com/tw93/Mole',
			tags: ['cli', 'productivity']
		},
		{
			name: 'GitHub CLI',
			description:
				'Official GitHub command-line tool. Manage pull requests, issues, repositories, and more directly from your terminal.',
			installCommand: 'brew install gh',
			link: 'https://cli.github.com/',
			tags: ['cli', 'development', 'version-control']
		},
		{
			name: 'Zed',
			description:
				'A high-performance, multiplayer code editor built in Rust. Designed for speed and collaboration with AI assistance built-in.',
			installCommand: 'brew install --cask zed',
			link: 'https://zed.dev/',
			tags: ['desktop-app', 'development']
		},
		{
			name: 'Bun',
			description:
				'A fast all-in-one JavaScript runtime and toolkit. Drop-in replacement for Node.js with native bundler, transpiler, test runner, and npm-compatible package manager.',
			installCommand: 'brew install oven-sh/bun/bun',
			link: 'https://bun.sh/',
			tags: ['cli', 'package-manager', 'development']
		},
		{
			name: 'Atuin',
			description:
				'Magical shell history. Sync, search, and backup shell history across all your machines with end-to-end encryption.',
			installCommand: 'brew install atuin',
			link: 'https://atuin.sh/',
			tags: ['cli', 'productivity']
		}
	];

	// Filter state
	let selectedTags = $state<Set<TagId>>(new Set());

	// Derived filtered tools
	let filteredTools = $derived(
		selectedTags.size === 0
			? tools
			: tools.filter((tool) => tool.tags.some((tag) => selectedTags.has(tag)))
	);

	// Tag helpers
	function toggleTag(tagId: TagId) {
		const newSet = new Set(selectedTags);
		if (newSet.has(tagId)) {
			newSet.delete(tagId);
		} else {
			newSet.add(tagId);
		}
		selectedTags = newSet;
	}

	function clearFilters() {
		selectedTags = new Set();
	}

	function getTagLabel(tagId: TagId): string {
		return availableTags.find((t) => t.id === tagId)?.label ?? tagId;
	}

	// Clipboard state
	let copiedKey = $state<string | null>(null);

	async function copyToClipboard(text: string, key: string) {
		await navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => {
			copiedKey = null;
		}, 2000);
	}

	// Export mode state (off by default)
	let exportMode = $state(false);
	let selectedTools = $state<Set<string>>(new Set());

	function enterExportMode() {
		exportMode = true;
		// Select all filtered tools when entering export mode
		selectedTools = new Set(filteredTools.map((t) => t.name));
	}

	function exitExportMode() {
		exportMode = false;
		selectedTools = new Set();
	}

	function toggleToolSelection(toolName: string) {
		const newSet = new Set(selectedTools);
		if (newSet.has(toolName)) {
			newSet.delete(toolName);
		} else {
			newSet.add(toolName);
		}
		selectedTools = newSet;
	}

	function selectAllTools() {
		selectedTools = new Set(filteredTools.map((t) => t.name));
	}

	function deselectAllTools() {
		selectedTools = new Set();
	}

	// Generate consolidated commands from selected tools (multi-line format)
	let consolidatedCommands = $derived.by(() => {
		const commands: string[] = [];
		for (const tool of tools) {
			if (!selectedTools.has(tool.name)) continue;

			if (tool.installSteps) {
				for (const step of tool.installSteps) {
					commands.push(step.command);
				}
			} else if (tool.installCommand) {
				commands.push(tool.installCommand);
			}
		}
		return commands.join('\n');
	});

	let selectedCount = $derived(selectedTools.size);
	let allFilteredSelected = $derived(
		filteredTools.length > 0 && filteredTools.every((t) => selectedTools.has(t.name))
	);
</script>

<svelte:head>
	<title>Dev Setup - Guillaume Taffin</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-6 py-16 md:py-24">
	<!-- Header -->
	<header class="mb-8 md:mb-12">
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

	<!-- Tag Filter Bar -->
	<div class="mb-8 md:mb-12">
		<div class="flex flex-wrap items-center gap-2">
			{#each availableTags as tag (tag.id)}
				<button
					onclick={() => toggleTag(tag.id)}
					class="rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 {selectedTags.has(
						tag.id
					)
						? 'border-primary bg-primary text-primary-foreground'
						: 'border-border/60 bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground'}"
				>
					{tag.label}
				</button>
			{/each}
			{#if selectedTags.size > 0}
				<button
					onclick={clearFilters}
					class="ml-1 flex items-center gap-1 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
				>
					<X class="h-3 w-3" />
					<span class="hidden sm:inline">Clear</span>
				</button>
			{/if}
		</div>
		{#if selectedTags.size > 0}
			<p class="mt-3 text-sm text-muted-foreground">
				Showing {filteredTools.length} of {tools.length} tools
			</p>
		{/if}

		<!-- Export mode controls -->
		{#if exportMode}
			<div class="mt-4 flex items-center gap-3 border-t border-border/30 pt-4">
				<span class="text-xs font-medium text-muted-foreground">Selection:</span>
				<button
					onclick={selectAllTools}
					disabled={allFilteredSelected}
					class="text-xs font-medium text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:text-muted-foreground/50"
				>
					Select all
				</button>
				<span class="text-muted-foreground/50">|</span>
				<button
					onclick={deselectAllTools}
					disabled={selectedCount === 0}
					class="text-xs font-medium text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:text-muted-foreground/50"
				>
					Deselect all
				</button>
				<button
					onclick={exitExportMode}
					class="ml-auto flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					<X class="h-3 w-3" />
					Cancel
				</button>
			</div>
		{:else}
			<div class="mt-4 border-t border-border/30 pt-4">
				<button
					onclick={enterExportMode}
					class="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
				>
					<Package class="h-4 w-4" />
					Bulk export commands
				</button>
			</div>
		{/if}
	</div>

	<!-- Tools List -->
	<div class="space-y-0">
		{#each filteredTools as tool, index (tool.name)}
			<article
				class="group py-8 {index > 0 ? 'border-t border-border/50' : ''}"
				style="animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) {index * 0.1}s both"
			>
				<!-- Tool Header -->
				<div class="mb-4 flex items-start justify-between gap-4">
					<div class="flex min-w-0 flex-1 gap-3">
						{#if exportMode}
							<!-- Selection checkbox (only in export mode) -->
							<button
								onclick={() => toggleToolSelection(tool.name)}
								class="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-primary"
								aria-label={selectedTools.has(tool.name)
									? `Deselect ${tool.name}`
									: `Select ${tool.name}`}
							>
								{#if selectedTools.has(tool.name)}
									<SquareCheck class="h-5 w-5 text-primary" />
								{:else}
									<Square class="h-5 w-5" />
								{/if}
							</button>
						{/if}
						<div class="min-w-0 flex-1">
							<h2 class="text-xl font-medium tracking-tight">{tool.name}</h2>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
								{tool.description}
							</p>
							<!-- Tool Tags -->
							<div class="mt-2 flex flex-wrap gap-1.5">
								{#each tool.tags as tagId (tagId)}
									<button
										onclick={() => toggleTag(tagId)}
										class="rounded-full border border-border/40 bg-muted/20 px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary {selectedTags.has(
											tagId
										)
											? 'border-primary/50 bg-primary/10 text-primary'
											: ''}"
									>
										{getTagLabel(tagId)}
									</button>
								{/each}
							</div>
						</div>
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

	<!-- Spacer for sticky panel -->
	{#if exportMode && selectedCount > 0}
		<div class="h-64"></div>
	{/if}
</div>

<!-- Sticky Export Panel -->
{#if exportMode && selectedCount > 0}
	<div
		class="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-sm"
		style="animation: fade-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
	>
		<div class="mx-auto max-w-2xl px-6 py-4">
			<!-- Header -->
			<div class="mb-3 flex items-center justify-between">
				<p class="text-sm font-medium">
					{selectedCount} tool{selectedCount !== 1 ? 's' : ''} selected
				</p>
				<Button
					onclick={() => copyToClipboard(consolidatedCommands, 'bulk-export')}
					size="sm"
					class="gap-2"
				>
					{#if copiedKey === 'bulk-export'}
						<Check class="h-4 w-4" />
						<span>Copied!</span>
					{:else}
						<Copy class="h-4 w-4" />
						<span>Copy all</span>
					{/if}
				</Button>
			</div>
			<!-- Command preview -->
			<div
				class="max-h-36 overflow-auto rounded-lg border border-border/40 bg-muted/30"
			>
				<pre
					class="px-4 py-3 font-mono-display text-sm leading-relaxed">{consolidatedCommands}</pre>
			</div>
		</div>
	</div>
{/if}
