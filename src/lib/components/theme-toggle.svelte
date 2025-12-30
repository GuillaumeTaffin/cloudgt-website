<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { theme, resolveTheme } from '$lib/stores/theme.svelte';
	import { browser } from '$app/environment';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	let currentTheme = $derived(resolveTheme(theme.current));

	function toggleTheme() {
		const resolved = resolveTheme(theme.current);
		theme.current = resolved === 'dark' ? 'light' : 'dark';
	}

	$effect(() => {
		if (browser) {
			const resolved = resolveTheme(theme.current);
			document.documentElement.classList.toggle('dark', resolved === 'dark');
		}
	});
</script>

<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme">
	{#if currentTheme === 'dark'}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</Button>
