<script lang="ts">
    // Import libraries
    import zzfx from '#lib/zzfx_lib.ts'


    // Object setup
    let {sound_data=[2,,46,.01,.05,.21,4,3.3,4,,,,,2,,.3,.33,.44,.08,,357]} = $props()
    let sound_model = $derived(new zzfx.ZZFXSound(sound_data))






	// instance-level logic goes here
    function play_sound_effect() {
        sound_model.play()
    }
</script>

<!-- markup (zero or more items) goes here -->
 <button onclick={play_sound_effect}>jump</button>
 <!-- this computation doesn't account for randomness. 
  when implemented with the zzfxSound -- randomness seems to change playspeed.
  we could ditch that and I _think_ frequency changes don't effect randomness if we don't prebuild samples.
  In this case time = attack+Decay+sustain+release+Delay(default 0) (indexes 6, 7, 8, 9, 19) -->
{sound_model?.samples?.length / zzfx.ZZFX.sampleRate}
<style>
	/* styles go here */
</style>

<!--
Absolute PITA to get this working. But I learned a lot:

1. serverside rendering / client-side rendering can become a PAIN if you're not careful. The `browser` import above shows a clean way to _ask_ if you're in the browser or not.
2. Async requires an experimental change:

experimental: {
    async: true,
},

to be added to the compileOptions in vite.config.ts

From there -- this does work as intended. But the "dual path" world is annoying, especially with imports.

-->