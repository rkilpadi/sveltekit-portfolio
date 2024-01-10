<script>
	import { onDestroy, onMount } from 'svelte';

	const words = ['software engineer', 'student', 'developer', 'musician'];
	const baseText = ['Hi, my name is', 'Ryan Kilpadi', "I'm a", ''];
	const text = ['', '', '', ''];
	const typeMillis = 100;
	const pauseMillis = 2000;
	const cycleIdx = words.length - 1;

	let timeout;
	let wordIdx = 0;
	let cursorVisible = true;
	let firstType = true;

	function type(line = 0, charIdx = 0) {
		if (charIdx < baseText[line].length) {
			text[line] += baseText[line][charIdx];
			timeout = setTimeout(() => type(line, charIdx + 1), typeMillis);
		} else if (line < baseText.length - 1) {
			timeout = setTimeout(() => type(line + 1), typeMillis);
		} else {
			cycleType();
		}
	}

	function untype() {
		if (text[cycleIdx].length > 0) {
			text[cycleIdx] = text[cycleIdx].slice(0, -1);
			timeout = setTimeout(untype, typeMillis);
		} else {
			cycleType();
		}
	}

	function cycleType(wait = true) {
		if (firstType) {
			wait = false;
			firstType = false;
		}

		if (wait) {
			timeout = setTimeout(() => cycleType(false), pauseMillis);
			// CSS cursor blink animation has bugs - hacky fix in JS instead
			const blinks = 4;
			for (let i = 1; i <= blinks; i++) {
				setTimeout(() => (cursorVisible = i % 2 === 0), (i * pauseMillis) / blinks);
			}
		} else if (text[cycleIdx].length > 0) {
			untype();
		} else {
			baseText[cycleIdx] = words[wordIdx];
			wordIdx = (wordIdx + 1) % words.length;
			type(cycleIdx);
		}
	}

	onMount(type);

	onDestroy(() => clearTimeout(timeout));
</script>

<div id="title-block">
	<p id="hi-text">
		{text[0]}
		{#if text[0] !== baseText[0]}
			<span id="colored-cursor" class="cursor">&nbsp;</span>
		{/if}
	</p>

	<p id="name-text">
		{text[1]}
		{#if text[1] !== baseText[1] && text[0] === baseText[0]}
			<span class="cursor">&nbsp;</span>
		{/if}
	</p>

	<p id="sub-name-text">
		{text[2]}
		<span id="type-text">{text[3]}</span>
		{#if text[1] === baseText[1] && text[2] === baseText[2] && cursorVisible}
			<span id="colored-cursor" class="cursor">&nbsp;</span>
		{:else if text[1] === baseText[1] && cursorVisible}
			<span class="cursor">&nbsp;</span>
		{/if}
	</p>
</div>

<style>
	#title-block {
		text-align: left;
		position: fixed;
		top: 30%;
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
		background-color: var(--color-secondary);
		margin-left: 0.1rem;
		width: 3px;
	}

	#colored-cursor {
		background-color: var(--color-primary);
	}

	@media only screen and (max-width: 768px) {
		#title-block {
			font-size: 0.5em;
		}

		#hi-text {
			font-size: 2.5em;
		}

		#sub-name-text {
			font-size: 3em;
		}
	}
</style>
