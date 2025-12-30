<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const isHomepage = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Guillaume Taffin</title>
	<meta
		name="description"
		content="Personal website of Guillaume Taffin, Tech Leader at AKUR8, Montreal"
	/>
</svelte:head>

<div
	class="relative flex min-h-screen flex-col text-foreground {isHomepage ? '' : 'bg-background'}"
>
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<footer
		class="py-6 transition-colors duration-300 {isHomepage
			? 'border-transparent bg-transparent'
			: 'border-t border-border/40'}"
	>
		<div class="container mx-auto max-w-screen-xl px-4 text-center text-sm text-muted-foreground">
			<p>&copy; {new Date().getFullYear()} Guillaume Taffin</p>
		</div>
	</footer>
</div>
