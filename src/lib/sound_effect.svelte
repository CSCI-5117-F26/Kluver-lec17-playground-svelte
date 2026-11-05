<script module>
    
</script>

<script lang="ts">
	import { browser } from '$app/env';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ZZFX:any = undefined
    if (browser) {
        ZZFX = (await import('zzfx')).ZZFX;
    }
	// instance-level logic goes here
    function play_sound_effect() {
        if(browser) {
            ZZFX.play(...[.7,,258,.01,.02,.07,,1.5,15,52,,,,,,,,.64,,,117])
        }
    }
</script>

<!-- markup (zero or more items) goes here -->
 <button onclick={play_sound_effect}>jump</button>

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