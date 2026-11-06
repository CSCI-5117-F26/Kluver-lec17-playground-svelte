/*
 shared management library for zzfx. Responsibilities:
 1. Queueing
 2. Managing SSR/CSR availability
 3. Whatever else I need over time I guess...
*/

import { browser } from '$app/env';

// import browser-side only.
let zzfx = null
if (browser) {
    zzfx = (await import('zzfx'));
} else {
   class shim_ZZFXSound {
    samples: number[];
    constructor(a) {
        this.samples = [1]
    }
    play() {

    }
   }

    // empty shims to avoid crashes.
    zzfx = {
        ZZFXSound: function(a) {
            return {ZZFXSound:shim_ZZFXSound}
        },
        ZZFX: {sampleRate: 1}
    }
}

export default zzfx