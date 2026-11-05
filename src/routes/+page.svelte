<script>
	import PopGoes from "./PopGoes.svelte";

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<PopGoes max = 5 onpop  ={()=>{alert("pop")}}></PopGoes>