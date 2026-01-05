<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from './theme-toggle.svelte';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/setup', label: 'Dev Setup' }
	];

	const isHomepage = $derived($page.url.pathname === '/');
</script>

<header
	class="sticky top-0 z-50 w-full transition-colors duration-300 {isHomepage
		? 'border-transparent bg-transparent'
		: 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'}"
>
	<div class="container mx-auto flex h-14 max-w-screen-xl items-center px-4 md:px-6">
		{#if isHomepage}
			<!-- Homepage: minimal header with just theme toggle and action button -->
			<div class="flex flex-1 items-center justify-between">
				<div class="flex items-center gap-2">
					<ThemeToggle />
					<a
						href="https://github.com/GuillaumeTaffin/cloudgt-website"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
						aria-label="GitHub repository"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
				<a
					href="/setup"
					class="group flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/50 hover:text-foreground"
				>
					<span>Dev Setup</span>
					<svg
						class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		{:else}
			<!-- Other pages: full navigation -->
			<nav class="flex items-center gap-6 text-sm">
				<a href="/" class="font-semibold text-foreground">Guillaume Taffin</a>
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class="transition-colors hover:text-foreground/80 {$page.url.pathname === item.href
							? 'text-foreground'
							: 'text-foreground/60'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<div class="flex flex-1 items-center justify-end gap-2">
				<a
					href="https://github.com/GuillaumeTaffin/cloudgt-website"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
					aria-label="GitHub repository"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<ThemeToggle />
			</div>
		{/if}
	</div>
</header>
