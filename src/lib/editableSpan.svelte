<script lang="ts">
	let editMode = $state(false)
    let value = $state("hi")
</script>

{#if editMode}
	<input bind:value={value} ><button onclick={()=>{editMode = false}}>save</button>
{:else}
	<span onclick={()=>{editMode=true}}>{value}</span>
{/if}

<!-- markup (zero or more items) goes here -->

<style>
	/* styles go here */
</style>