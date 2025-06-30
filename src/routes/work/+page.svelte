<script>
	import { experiences } from './data.js';
	import Card from './WorkCard.svelte';
</script>

<main>
    <div class="experience-list">
        {#each experiences as experience}
            <Card {...experience} />
        {/each}
        <a href="/resume.pdf">View full resume</a>
    </div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 20px;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}

	.experience-list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>

