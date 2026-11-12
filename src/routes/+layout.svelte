<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
HEAD <a href="/">home</a> | <a href="/account">/account</a> | <a href="/stupid_tests">/stupid_tests</a>
<br>
{@render children()}
<br>
FOOOT 