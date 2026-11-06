<script lang="ts">
	import EditableSpan from "#lib/editableSpan.svelte";

	let props = $props() 
</script>
<EditableSpan></EditableSpan>{JSON.stringify(props)}