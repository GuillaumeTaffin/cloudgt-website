<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';

	const languages = [
		{ name: 'French', level: 'Native' },
		{ name: 'English', level: 'Fluent' },
		{ name: 'Spanish', level: 'Conversational' }
	];
</script>

<svelte:head>
	<title>Guillaume Taffin - Tech Leader</title>
</svelte:head>

<div class="container mx-auto max-w-screen-xl px-4 py-12 md:py-24">
	<section class="flex flex-col items-center text-center">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Guillaume Taffin</h1>
		<p class="mt-4 text-xl text-muted-foreground md:text-2xl">
			Tech Leader & Mentor at
			<a
				href="https://akur8.com"
				target="_blank"
				rel="noopener noreferrer"
				class="font-semibold text-primary underline-offset-4 hover:underline">AKUR8</a
			>
		</p>
		<p class="mt-2 text-lg text-muted-foreground">Based in Montreal, Canada</p>
	</section>

	<Separator class="my-12" />

	<section class="mx-auto max-w-2xl">
		<h2 class="text-2xl font-semibold tracking-tight">About Me</h2>
		<p class="mt-4 leading-relaxed text-muted-foreground">
			I am a passionate tech leader and mentor, currently guiding engineering teams at AKUR8. With a
			focus on building scalable solutions and fostering team growth, I enjoy tackling complex
			challenges and sharing knowledge with fellow developers.
		</p>
	</section>

	<Separator class="my-12" />

	<section class="mx-auto max-w-2xl">
		<h2 class="text-2xl font-semibold tracking-tight">Languages</h2>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each languages as lang (lang.name)}
				<Badge variant="secondary" class="text-sm">
					{lang.name} ({lang.level})
				</Badge>
			{/each}
		</div>
	</section>
</div>
