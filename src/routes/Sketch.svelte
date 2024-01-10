<script>
	import P5 from 'p5-svelte';
	import { p5Settings } from '$lib/stores.js';
	import { onDestroy } from 'svelte';

	let p5Instance;
	let particles = [];
	$: ({ playing, repelDistance, particleCount, noiseScale, strokeWeight } = $p5Settings);

	const sketch = (p5) => {
		p5Instance = p5;

		p5.setup = () => {
			p5.createCanvas(window.innerWidth, window.innerHeight);
			for (let i = 0; i < particleCount; i++) {
				particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
			}
			p5.stroke('lightseagreen');
		};

		p5.draw = () => {
			p5.strokeWeight(strokeWeight);
			p5.background(35, 30, 50, 10);

			for (let i = 0; i < particleCount; i++) {
				if (i >= particles.length) {
					particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
				}
				let p = particles[i];
				p5.point(p.x, p.y);

				let mouseToParticle = p5.createVector(p.x - p5.mouseX, p.y - p5.mouseY);
				let distance = mouseToParticle.mag();
				if (distance < repelDistance) {
					mouseToParticle.setMag(p5.map(distance, 0, repelDistance, 5, 0));
					p.add(mouseToParticle);
				} else {
					let a =
						p5.TAU *
						p5.noise(p.x * noiseScale, p.y * noiseScale, p5.frameCount * noiseScale * noiseScale);
					p.x += Math.cos(a);
					p.y += Math.sin(a);
					if (p.x < 0 || p.x > p5.width || p.y < 0 || p.y > p5.height) {
						p.x = p5.width;
						p.y = Math.random() * p5.windowHeight;
					}
				}
			}
		};

		p5.mousePressed = () => {
			p5.noiseSeed(p5.millis());
		};

		p5.keyPressed = () => {
			if (p5.keyCode === p5.LEFT_ARROW || p5.keyCode === p5.RIGHT_ARROW) {
				p5.noiseSeed(p5.millis());
			} else if (p5.keyCode === 32) {
				playing ? p5.loop() : p5.noLoop();
				p5Settings.update((settings) => {
					settings.playing = !settings.playing;
					return settings;
				});
			}
		};

		p5.windowResized = () => {
			p5.canvas.remove();
			p5.setup();
		};
	};

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<P5 {sketch} />
