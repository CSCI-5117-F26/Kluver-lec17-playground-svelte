<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import SoundEffect from '#lib/sound_effect.svelte';
	import type { LayoutProps } from './$types';
	import { setContext } from 'svelte';

	let {data, children }: LayoutProps = $props();

	let board =  $derived(data)

	setContext('board', board);

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">home</a> | <a href="/account">/account</a> | <a href="/stupid_tests">/stupid_tests</a>
</nav>
<main>
  <div class="board">
	{#each board.sounds as sound, i}
		<SoundEffect sound_data={sound.data} emoji={sound.emoji} id={i}>
		</SoundEffect>
	{/each}
	{#if board.sounds.length < 12}
	<a href="/new" class=new>+</a>
	{/if}
  </div>
  {@render children()}
</main>

<style>
main {
	display: flex;
	justify-content: center;
}
.board {
	flex-grow:0;
	display: flex;
	flex-wrap: wrap;
	background-color:hsl(0, 0%, 55%);
	border-radius: 1em;
	border: 1px black solid;
	width: 30.5em;
	height: 23em;
}

.new {
	display: inline-block;
	background-color: hsl(60, 100%, 20%);
	padding:0.75em;
	border-radius: 0.5em;
	font-size:2em;
	margin:0.5em;
	border: 1px solid black;
	position: relative;
	cursor: pointer;
	width: 1em;
	height: 1em;
	font-weight: 999;
	text-align: center;
	text-decoration: none;
	color: black;
}
</style>