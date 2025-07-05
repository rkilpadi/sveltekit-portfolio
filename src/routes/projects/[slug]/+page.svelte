<script>
    import 'katex/dist/katex.min.css';
    import 'highlight.js/styles/github-dark.css';

	import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
	import { readingMode, particlesSpawned, refresh } from '$lib/sketchStores.js';

    const { data } = $props();

    function maybeSetDefaultBg() {
        if (!$particlesSpawned && browser) {
            document.body.classList.add('default-bg');
        }
    }

	onMount(() => {
        $readingMode = true;
        maybeSetDefaultBg();
	});

	onDestroy(() => {
        $readingMode = false;
        refresh();
        if (browser) {
            document.body.classList.remove('default-bg');
        }
	});
</script>

<svelte:window onresize={maybeSetDefaultBg} />

<article class="markdown-body">
    {@html data.html}
</article>

<style>
    :global(body.default-bg) {
        background-image: url('/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: repeat;
        background-attachment: fixed;
        min-height: 100vh;
        overscroll-behavior: none;
    }

    .markdown-body {
        color: var(--color-secondary);
    }

    :global(.katex-display) {
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        max-width: 100%;
    }
</style>

