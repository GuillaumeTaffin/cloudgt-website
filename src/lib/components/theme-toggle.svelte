<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { theme, resolveTheme, type Theme } from '$lib/stores/theme.svelte';
	import { browser } from '$app/environment';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';

	function setTheme(value: Theme) {
		theme.current = value;
	}

	$effect(() => {
		if (browser) {
			const resolved = resolveTheme(theme.current);
			document.documentElement.classList.toggle('dark', resolved === 'dark');
		}
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button variant="ghost" size="icon" {...props} aria-label="Toggle theme">
				{#if theme.current === 'light'}
					<Sun class="h-5 w-5" />
				{:else if theme.current === 'dark'}
					<Moon class="h-5 w-5" />
				{:else}
					<Monitor class="h-5 w-5" />
				{/if}
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => setTheme('light')}>
			<Sun class="mr-2 h-4 w-4" />
			Light
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setTheme('dark')}>
			<Moon class="mr-2 h-4 w-4" />
			Dark
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setTheme('system')}>
			<Monitor class="mr-2 h-4 w-4" />
			System
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
