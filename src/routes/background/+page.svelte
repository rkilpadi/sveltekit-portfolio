<script>
	import { particleCount, strokeWeight, noiseScale, repelDistance, refresh } from '$lib/sketchStores.js';
</script>

<div class="text-column">
	<h1>Background</h1>

	<div class="card">
        <p>
            I'm a software engineer currently working at Amazon Web Services in High Performance Computing.
            Before that, I studied mathematics and computer science at Vassar College.
            I love building all sorts of things, including <a href="https://github.com/rkilpadi/sveltekit-portfolio">this website</a> made with Svelte.
        </p>
        <p>
            The background of this website is a <a href="https://en.wikipedia.org/wiki/Perlin_noise">Perlin noise</a> simulation built in p5.js.
            <br>It inspired <a href="https://flowplane.vercel.app/?dx=cos(x)&dy=y">Flowplane</a>, an interactive web app I made that visualizes 2D dynamical systems.
            <br>Feel free to tinker with the settings below or click to <span class="refresh-button" onclick={refresh}>refresh</span> the animation.
        </p>

        <div class="sliders">
            <label> Particle Count
                <input
                    type="range"
                    min=0
                    max=10000
                    bind:value={$particleCount}
                    name="force"
                />
            </label>

            <label> Particle Size
                <input 
                    type="range"
                    min=1
                    max=10
                    bind:value={$strokeWeight}
                    name="strokeWeight"
                />
            </label>

            <label> Noise
                <input
                    type="range"
                    min=0
                    max=0.05
                    step=0.001
                    bind:value={$noiseScale}
                    name="noiseScale"
                />
            </label>

            <label> Repel Distance
                <input
                    type="range"
                    min=0
                    max=500
                    bind:value={$repelDistance}
                    name="noiseScale"
                />
            </label>
        </div>
	</div>
</div>

<style>
	.card {
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        backdrop-filter: blur(5px);
        padding: 20px;
        margin-bottom: 20px;
        transition: 0.3s;
		color: var(--color-secondary);
    }

	.text-column {
		top: 30%;
	}

	h1, .card, .refresh-button {
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}

	h1 {
		color: var(--color-primary);
	}

    .refresh-button {
        cursor: pointer;
        color: var(--color-primary);
        font-weight: bold;
    }

    .refresh-button:hover {
        color: var(--color-secondary);
    }

	input {
		accent-color: var(--color-primary);
	}

	.sliders {
		display: flex;
		justify-content: space-between;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}

	@media only screen and (max-width: 768px) {
		.sliders {
			flex-direction: column;
		}	
	}
</style>

