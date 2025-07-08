<script>
	import P5 from 'p5-svelte';
	import { onDestroy } from 'svelte';
	import { 
        particleCount, 
        strokeWeight,
        repelDistance, 
        noiseScale, 
        readingMode, 
        particlesSpawned,
        refresh 
    } from '$lib/sketchStores.js';

	let p5Instance;

	const sketch = (p5) => {
		p5Instance = p5;

        // state is managed by p5, no need for runes
        let particles = [];
        let escapedParticles = new Set();
        let sketchWidth = window.innerWidth;
        let sketchHeight = window.innerHeight;

		p5.setup = () => {
			p5.createCanvas(sketchWidth, sketchHeight);
            if ($readingMode) {
                return;
            }
            $particlesSpawned = true;

            if (sketchWidth < 768 || sketchHeight < 500) {
                $particleCount = 400;
                $strokeWeight = 5;
            }
			for (let i = 0; i < $particleCount; i++) {
				particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
			}
			p5.stroke('lightseagreen');
		};

		p5.draw = () => {
			p5.strokeWeight($strokeWeight);

            if (!$readingMode) {
                p5.background(35, 30, 50, 10);
            } else {
                p5.background(24, 19, 40, 10);
                if (escapedParticles.size == $particleCount) {
                    escapedParticles = new Set();
                    $particleCount = 0;
                    return;
                }
            }

			for (let i = 0; i < $particleCount; i++) {
				if (i >= particles.length) {
                    if ($readingMode) {
                        break;
                    }
					particles.push(p5.createVector(Math.random() * p5.width, Math.random() * p5.height));
				}
				let p = particles[i];
				p5.point(p.x, p.y);

                if ($readingMode) {
                    p.x += (p.x - p5.mouseX) / 50;
                    p.y += (p.y - p5.mouseY) / 50;
                }

                let a = p5.TAU * p5.noise(p.x * $noiseScale, p.y * $noiseScale);
                p.x += Math.cos(a);
                p.y += Math.sin(a);

                if (p.x < 0 || p.x > p5.width || p.y < 0 || p.y > p5.height) {
                    if ($readingMode) {
                        escapedParticles.add(p);
                    } else {
                        p.x = p5.width;
                        p.y = Math.random() * p5.height;
                    }
                }

                if ($repelDistance > 0) {
                    let mouseToParticle = p5.createVector(p.x - p5.mouseX, p.y - p5.mouseY);
                    let distance = mouseToParticle.mag();
                    if (distance < $repelDistance) {
                        mouseToParticle.setMag(p5.map(distance, 0, $repelDistance, 5, 0));
                        p.add(mouseToParticle);
                    }
				}
			}
		};

		p5.windowResized = () => {
            const widthChanged = sketchWidth !== window.innerWidth;
            const heightChangedWithTolerance = Math.abs(sketchHeight - window.innerHeight) > 100;
            if (!$readingMode && (widthChanged || heightChangedWithTolerance)) {
                sketchWidth = window.innerWidth;
                sketchHeight = window.innerHeight;
                refresh();
            }
		};
	};

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<P5 {sketch} />

