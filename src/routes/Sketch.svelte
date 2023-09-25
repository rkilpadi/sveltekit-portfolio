<script>
    import P5 from 'p5-svelte';
    import { p5Settings } from '$lib/stores.js';

    let particles = [];
    $: ({ playing, repel, repelDistance, particleCount, noise, strokeWeight } = $p5Settings); 
    $: noiseScale = noise/1000;

    const sketch = (p5) => {

        p5.setup = () => {
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            for (let i = 0; i < particleCount; i++) {
                particles.push(p5.createVector(p5.random(p5.width), p5.random(p5.height)));
            }

            p5.stroke("lightseagreen");
        };

         p5.draw = () => {
            p5.strokeWeight(strokeWeight);
            
            p5.background(35, 30, 50, 10);
            for (let i = 0; i < particleCount; i++) {
                if (i > particles.length-1) {
                    particles.push(p5.createVector(p5.random(p5.width), p5.random(p5.height))); 
                }
                let p = particles[i];
                p5.point(p.x, p.y);

                let mouseToParticle = p5.createVector(p.x - p5.mouseX, p.y - p5.mouseY);
                let distance = mouseToParticle.mag();
                if (repel && distance < repelDistance) {
                    let repelForce = p5.map(distance, 0, repelDistance, 5, 0);
                    mouseToParticle.setMag(repelForce);
                    p.add(mouseToParticle);
                } else {
                    let n = p5.noise(p.x * noiseScale, p.y * noiseScale, p5.frameCount * noiseScale * noiseScale);
                    let a = p5.TAU * n;
                    p.x += p5.cos(a);
                    p.y += p5.sin(a);
                    if (!(p.x >= 0 && p.x <= p5.width && p.y >= 0 && p.y <= p5.height)) {
                        p.x = p5.width;
                        p.y = p5.random(p5.windowHeight);
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
                p5Settings.update(settings => {
                    settings.playing = !settings.playing;
                    return settings;
                })
            }
        };

        p5.windowResized = () => {
            p5.canvas.remove();
            p5.setup();
        };
    };
</script>

<P5 {sketch} />
