<script lang="ts">
    // Import libraries
    import {Sound} from '#lib/zzfx_lib.svelte.ts'
    const stroke_width = 10;

    // Object setup
    let {
        sound_data=[2,,46,.01,.05,.21,4,3.3,4,,,,,2,,.3,.33,.44,.08,,357],
        emoji = "🔊" // we might want/need a cleaner solution to this long-run.
    } = $props()
    let sound_model = $derived(new Sound(sound_data))






	// instance-level logic goes here
    function play_sound_effect() {
        if (! sound_model.playing ) {
            sound_model.play()
        }
    }
</script>

<div class="container" onmousedown={(e)=>{if (e.detail > 1){e.preventDefault()}}}>
    <span>{emoji}</span>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="hover {sound_model.playing ? "playing" : ""}" onclick={play_sound_effect}>
        <svg viewBox="-100 -100 200 200">
            <circle
                fill="hsl(60 25% 50% / 73%)"
                r="90"
            />
             <circle
                class="fill"
                stroke-width="{stroke_width}"
                stroke="black"
                fill="transparent"
                r="90"
                pathLength=100
                style:stroke-dashoffset={sound_model.progress_percent}
            />
             <circle
                class="spec"
                stroke-width="1"
                stroke="black"
                fill="transparent"
                r="{90-1/2}"
                cx="0"
                cy="0"
            />
            {#if sound_model.playing}
            <circle 
                fill="hsl(60, 100%, 60%)" 
                cx={-90*Math.cos(sound_model.progress_percent/100*2*Math.PI)} 
                cy={-90*Math.sin(sound_model.progress_percent/100*2*Math.PI)} 
                r=15/>
            {/if }
            <!-- adapted from https://www.svgrepo.com/ -->
             <g transform="scale({200/265.404}) translate(-{265.404/2} -{265.404/2})">
                <path xmlns="http://www.w3.org/2000/svg" style="fill:1;" d="M194.172,123.684l-78.081-51.122c-1.921-1.257-4.032-1.922-6.106-1.922   c-5.521,0-9.686,4.496-9.686,10.458v103.207c0,5.962,4.164,10.458,9.685,10.458c2.075,0,4.187-0.665,6.106-1.923l78.082-51.129   c3.251-2.129,5.117-5.415,5.116-9.014C199.289,129.098,197.424,125.814,194.172,123.684z M115.3,175.429V89.973l65.256,42.725   L115.3,175.429z"/>
            </g>
        </svg>
        <div class="gear" onclick={(e)=>{e.stopPropagation()}}>⚙️</div>
    </div>
</div>


<style>
    .container {
        display: inline-block;
        background-color: hsl(60, 100%, 20%);
        padding:0.75em;
        border-radius: 0.5em;
        font-size:2em;
        margin:0.5em;
        border: 1px solid black;
        position: relative;
        cursor: pointer;
    }
    .hover {
        display: none;
    }
    .container:hover>.hover, .container>.playing {
        display:block;
        position:absolute;
        z-index: 100;
        width:100%;
        height:100%;
        left:0;
        top:0;
        text-align: center;
        &>span{
            font-size:2em;
            display:block;
            margin:auto;
        }

        svg {
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            z-index: 110;

            circle.fill {
                stroke-dasharray: 0 100 100;
                stroke-dashoffset: 0;
                transform: scaleX(-1);
            }        
        
        }

        .gear {
            position:absolute;
            right:-0.5em;
            top:-0.5em;
            z-index: 120;
            font-size:0.75em;
            background-color:hsl(60 10% 50%);
            border-radius: 100%;
        }
    }

    

</style>
