<script>
	import P5 from 'p5-svelte';
	import { settings } from '$lib/stores.js';
	import { onDestroy } from 'svelte';

	let p5Instance;
	let particles = [];

	const sketch = (p5) => {
		p5Instance = p5;

		p5.setup = () => {
			p5.createCanvas(window.innerWidth, window.innerHeight);
            if (window.innerWidth < 768 || window.innerHeight < 500) {
                $settings.particleCount = 400;
                $settings.strokeWeight = 5;
            }
			for (let i = 0; i < $settings.particleCount; i++) {
				particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
			}
			p5.stroke('lightseagreen');
		};

		p5.draw = () => {
			p5.strokeWeight($settings.strokeWeight);
			p5.background(35, 30, 50, 10);

			for (let i = 0; i < $settings.particleCount; i++) {
				if (i >= particles.length) {
					particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
				}
				let p = particles[i];
				p5.point(p.x, p.y);

                let a = p5.TAU * p5.noise(p.x * $settings.noiseScale, p.y * $settings.noiseScale);
                p.x += Math.cos(a);
                p.y += Math.sin(a);

                if ($settings.repelDistance > 0) {
                    let mouseToParticle = p5.createVector(p.x - p5.mouseX, p.y - p5.mouseY);
                    let distance = mouseToParticle.mag();
                    if (distance < $settings.repelDistance) {
                        mouseToParticle.setMag(p5.map(distance, 0, $settings.repelDistance, 5, 0));
                        p.add(mouseToParticle);
                    }
				}

                if (p.x < 0 || p.x > p5.width || p.y < 0 || p.y > p5.height) {
                    p.x = p5.width;
                    p.y = Math.random() * p5.windowHeight;
                }
			}
		};

		p5.mousePressed = () => {
			p5.noiseSeed(p5.millis());
		};

		p5.keyPressed = () => {
            const spacebar = 32;
			if (p5.keyCode === p5.LEFT_ARROW || p5.keyCode === p5.RIGHT_ARROW) {
				p5.noiseSeed(p5.millis());
			} else if (p5.keyCode === spacebar) {
                $settings.playing = !$settings.playing;
				$settings.playing ? p5.loop() : p5.noLoop();
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

