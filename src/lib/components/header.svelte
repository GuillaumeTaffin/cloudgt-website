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
				<ThemeToggle />
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
			<div class="flex flex-1 items-center justify-end">
				<ThemeToggle />
			</div>
		{/if}
	</div>
</header>
