/*
This is a wrapper/adaptor for zzfx. I wanted responsive properties and 
a single source of some other features. This seems to give me that, 
but it is admittedly kind of annoying.
*/

import { browser } from '$app/env';

// import browser-side only.
export let zzfx = null
export const audio_status = $state({time:0})

if (browser) {
  zzfx = (await import('zzfx'));


  // let frameId: number;

  setInterval(() => {
    audio_status.time = zzfx.ZZFX.audioContext.currentTime;
  }, 5);

  // function update() {
  //   audio_status.time = zzfx.ZZFX.audioContext.currentTime;
  //   frameId = requestAnimationFrame(update);
  // }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // frameId = requestAnimationFrame(update);


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

type sound_data_type = (number|null)[]

export class Sound {
  sound_data: sound_data_type;

  duration = $state(undefined as number|undefined)
  started = $state(audio_status.time)
  end_at = $derived.by(()=>{
    if (this.duration === undefined) {
      return undefined
    }
    return this.started + this.duration
  })
  playing = $derived.by(()=>{
    if (this.end_at === undefined) {
      return false;
    } else return audio_status.time < this.end_at;
  })
  progress_percent = $derived.by(()=>{
    if (! this.playing || this.duration === undefined) {
      return undefined
    } else {
      return (audio_status.time - this.started)/this.duration*100;
    }
  })

  constructor(sound_data:sound_data_type) {
    this.sound_data = sound_data
    this.duration = undefined
  }

  play() {
    const audio_node:AudioBufferSourceNode = zzfx.ZZFX.play(...this.sound_data)
    this.started = audio_status.time
    this.duration = (audio_node.buffer?.duration)/audio_node.playbackRate.value
    setTimeout(()=>{this.duration=undefined},1100*this.duration)
  }

}
