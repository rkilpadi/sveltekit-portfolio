<script>
	import { onDestroy, onMount } from 'svelte';

	const words = ["software engineer", "student", "developer", "musician"];
	const hiBase = "Hi, my name is";
	const nameBase = "Ryan Kilpadi";
	const typeBase = "I'm a ";
	let lines = ["", "", ""];
	$: hiText = lines[0];
	$: nameText = lines[1];
	$: preText = lines[2];
	$: typingText = lines[2].slice(typeBase.length);

	let timeout;
	let charIdx = 0;
	let wordIdx = 0;
	let isDeleting = false;

	function type(base, line, callback) {
		if (charIdx < base.length) {
			lines[line] += base[charIdx];
			charIdx++;
			timeout = setTimeout(() => type(base, line, callback), 100);
		} else {
			charIdx = 0;
			callback();
		}
	}

	function cycleType() {
		if (lines[2].length < typeBase.length) {
			type(typeBase, 2, cycleType);
		} else if (!isDeleting && charIdx < words[wordIdx].length) {
			typingText += words[wordIdx][charIdx];
			charIdx++;
			timeout = setTimeout(cycleType, 100);
		} else if (isDeleting && charIdx > 0) {
			typingText = typingText.slice(0, -1);
			charIdx--;
			timeout = setTimeout(cycleType, 100);
		} else {
			const cursor = document.getElementById("type-cursor");
			cursor.style.animationPlayState = "running";
			isDeleting = !isDeleting;
			if (!isDeleting) {
				wordIdx = (wordIdx + 1) % words.length;
			}
			timeout = setTimeout(() => {
				cursor.style.animationPlayState = "paused";
				cycleType();
			}, 2000);
		}
	}

	onMount(() => {
		type(hiBase, 0, () => {
			type(nameBase, 1, () => {
				cycleType();
			});
		})
	});

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div id="title-block">
	<p id="hi-text">{hiText}
	  {#if hiText !== hiBase}
		<span id="hi-cursor" class="cursor">&nbsp;</span>
	  {/if}
	</p>
  
	<p id="name-text">{nameText}
	  {#if nameText !== nameBase && hiText === hiBase}
		<span id="name-cursor" class="cursor">&nbsp;</span>
	  {/if}
	</p>  
  
	<p id="sub-name-text">
	  {preText}
	  <span id="type-text">{typingText}</span>
	  {#if hiText === hiBase && nameText === nameBase}
		<span id="type-cursor" class="cursor">&nbsp;</span>
	  {/if}
	</p>
  </div>

<style>
	#title-block {
		text-align: left;
		position: fixed;
		top: 30%;
		left: 20%;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}

	#hi-text {
		font-size: 2em;
		font-weight: bold;
		color: var(--color-primary);
		margin: 0;
	}

	#name-text {
		font-size: 6em;
		font-weight: bold;
		color: var(--color-secondary);
		margin: 0;
	}

	#sub-name-text {
		font-size: 3em;
		font-weight: bold;
		color: var(--color-secondary);
		margin: 0;
	}

	#type-text {
		color: var(--color-primary);
	}

	.cursor {
		display: inline-block;
		background-color: var(--color-primary);
		margin-left: 0.1rem;
		width: 3px;
		animation: blink 1s steps(1) infinite;
		animation-play-state: paused;
	}

	#name-cursor {
		background-color: var(--color-secondary);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
