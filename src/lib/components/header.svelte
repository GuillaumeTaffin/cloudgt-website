<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from './theme-toggle.svelte';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/setup', label: 'Dev Setup' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
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
	</div>
</header>
