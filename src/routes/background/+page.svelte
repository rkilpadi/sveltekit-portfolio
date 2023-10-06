<script>
	import { p5Settings } from '$lib/stores.js';

	const maxRepel = 500;
	const maxParticles = 10000;
	const maxNoise = 50;
	const maxStrokeWeight = 15;
</script>

<div class="text-column">
	<h1>Background</h1>

	<div class="card">
	<p>Hi again, I'm Ryan!</p>
	<p>
		I'm a student software engineer passionate about using technology to build things. That includes this website, built with SvelteKit, Vite, and Vercel.
		I'm currently completing my undergrad at Vassar College studying mathematics and computer science.
		I interned at Amazon Web Services for the past two summers, working in the High Performance Computing division.
	</p>

	<p>
		The background of this website is a <a href="https://en.wikipedia.org/wiki/Perlin_noise">Perlin noise</a> simulation built in p5.js.
		Feel free to adjust the settings below (at your own risk).
	</p>

	<!-- <button class="button" on:click={() => $p5Settings.repel = !$p5Settings.repel}>repel</button>
	
	<input
		type="range"
		min=0
		max={maxRepel}
		bind:value={$p5Settings.repelDistance}
		name=force
	/> -->
	
	<div class="sliders">
	<label> Particle Count
		<input
			type="range"
			min=0
			max={maxParticles}
			bind:value={$p5Settings.particleCount}
			name="force"
		/>
	</label>

	<label> Particle Size
		<input 
			type="range"
			min=1
			max={maxStrokeWeight}
			bind:value={$p5Settings.strokeWeight}
			name="strokeWeight"
		/>
	</label>

	<label> Noise
		<input
			type="range"
			min=0
			max={maxNoise}
			bind:value={$p5Settings.noise}
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
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        transition: 0.3s;
		color: var(--color-secondary);
    }

	.text-column {
		top: 30%;
	}

	h1,
	p {
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}

	h1 {
		color: var(--color-primary);
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
