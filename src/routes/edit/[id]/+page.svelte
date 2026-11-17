<script lang="ts">
	import { EmojiPicker } from '@gyen/frimousse';
  import { getContext } from 'svelte';

  const {params} = $props()
  // a bit of an anti-pattern to design around editing this everywhere...
  const board = getContext('board');
  console.log(params)
  const sound = board.sounds[parseInt(params.id)]

  let editing_emoji = $state(false)

  function edit_emoji(emoji) {
    // step 1: update local data
    board.sounds[parseInt(params.id)].emoji = emoji; 
    editing_emoji=false
    // step 2: fire off a fetch
    fetch("/api/sounds/", {
      method: "PUT",
      "headers": {"content-type":"application/json"},
      "body": JSON.stringify(board)
    })
  }

</script>

<main>
{#if !editing_emoji}
<h1 onclick={()=>{editing_emoji=true}}>{sound.emoji}</h1>
{:else}

<EmojiPicker.Root onEmojiSelect={({ emoji }) => {edit_emoji(emoji)}}>
  <EmojiPicker.Search />
  <EmojiPicker.Viewport>
    <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
    <EmojiPicker.Empty>
      No emoji found.
    </EmojiPicker.Empty>
    <EmojiPicker.List />
  </EmojiPicker.Viewport>
</EmojiPicker.Root>
{/if}
<h2>{sound.name}</h2>
</main>

<style>
main {
	flex-grow:0;
    text-align: center;
    padding:3em;
}

:global {
[frimousse-root] {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 352px;
  background: light-dark(#fff, #171717);
  isolation: isolate;
}
[frimousse-category-header] {
  height:auto !important
}
[frimousse-search] {
  position: relative;
  z-index: 10;
  appearance: none;
  margin: 8px 8px 0;
  padding: 8px 10px;
  background: light-dark(#f5f5f5, #262626);
  border-radius: 6px;
  font-size: 14px;
}

[frimousse-viewport] {
  position: relative;
  flex: 1;
  outline: none;
}

[frimousse-loading],
[frimousse-empty] {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: light-dark(#737373, #a3a3a3);
  font-size: 14px;
}

[frimousse-list] {
  padding-block-end: 12px;
  user-select: none;
}

[frimousse-category-header] {
  padding: 12px 12px 6px;
  background: light-dark(#fff, #171717);
  color: light-dark(#525252, #a1a1a1);
  font-size: 12px;
  font-weight: 500;
}

[frimousse-row] {
  padding-inline: 12px;
  scroll-margin-block: 12px;
}

[frimousse-emoji] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  font-size: 18px;

  &[data-active] {
    background: light-dark(#f5f5f5, #262626);
  }
}
}
</style>