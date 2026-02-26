<script lang="ts">
	import Github from '@lucide/svelte/icons/github';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
</script>

<svelte:head>
	<title>Guillaume Taffin - Tech Leader</title>
</svelte:head>

<!-- Full-screen background layer (extends behind header/footer) -->
<div class="fixed inset-0 -z-10 bg-background" aria-hidden="true">
	<!-- Light mode: Soft gradient accents -->
	<div class="gradient-accent-light absolute inset-0 dark:opacity-0"></div>

	<!-- Light mode: Subtle corner accents -->
	<div
		class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/[0.08] blur-3xl dark:opacity-0"
	></div>
	<div
		class="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl dark:opacity-0"
	></div>

	<!-- Dark mode: Ambient glow -->
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 dark:opacity-100"
	>
		<div class="animate-glow h-[500px] w-[700px] rounded-full bg-primary/30 blur-[100px]"></div>
	</div>

	<!-- Dark mode: Secondary subtle glow -->
	<div class="absolute top-1/3 right-1/4 -translate-y-1/2 opacity-0 dark:opacity-100">
		<div
			class="animate-glow h-[300px] w-[300px] rounded-full bg-primary/20 blur-[80px]"
			style="animation-delay: -3s"
		></div>
	</div>
</div>

<!-- Hero Content -->
<div class="relative flex min-h-[calc(100vh-theme(spacing.14)-theme(spacing.20))] items-center">
	<section class="relative w-full px-6 py-20 md:py-32">
		<div class="mx-auto max-w-4xl">
			<!-- Title label -->
			<div class="animate-fade-up text-center" style="animation-delay: 0s">
				<p
					class="mb-6 text-sm font-medium tracking-[0.25em] text-muted-foreground uppercase md:text-base"
				>
					Tech Leader & Mentor
				</p>
			</div>

			<!-- Name with JetBrains Mono -->
			<div class="animate-fade-up text-center" style="animation-delay: 0.1s">
				<h1
					class="font-mono-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				>
					Guillaume Taffin
				</h1>
			</div>

			<!-- Subtitle -->
			<div class="animate-fade-up mt-6 text-center" style="animation-delay: 0.2s">
				<p class="text-lg text-muted-foreground md:text-xl">
					Tech Leader at
					<a
						href="https://akur8.com"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-primary transition-colors hover:text-primary/80"
					>
						AKUR8
					</a>
				</p>
				<p class="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground/70">
					<MapPin class="h-3.5 w-3.5" />
					Montreal, Canada
				</p>
			</div>

			<!-- Social links -->
			<div class="animate-fade-up mt-10 flex justify-center gap-3" style="animation-delay: 0.3s">
				<a
					href="https://github.com/GuillaumeTaffin"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
					aria-label="GitHub"
				>
					<Github class="h-[18px] w-[18px]" />
				</a>
				<a
					href="https://www.linkedin.com/in/guillaume-taffin-31343b129/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
					aria-label="LinkedIn"
				>
					<Linkedin class="h-[18px] w-[18px]" />
				</a>
				<a
					href="mailto:hello@example.com"
					class="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
					aria-label="Email"
				>
					<Mail class="h-[18px] w-[18px]" />
				</a>
			</div>

			<!-- Tagline -->
			<div class="animate-fade-up mt-10" style="animation-delay: 0.4s">
				<p class="text-center text-sm tracking-wide text-muted-foreground/50 italic">
					Helping teams ship great software.
				</p>
			</div>
		</div>
	</section>
</div>
