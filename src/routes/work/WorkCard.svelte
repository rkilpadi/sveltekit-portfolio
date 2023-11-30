<script>
    import { slide, fade } from 'svelte/transition';
    export let location;
    export let date;
    export let company;
    export let position;
    export let image;
    export let bullets = [];

    let expanded = false;
</script>

<div class="work-card" on:click={() => expanded = !expanded}>
    <div class="logo-corner">
        {#if image}
            <img src={image} alt='' width="70">
        {/if}
    </div>
    <h3 class="top-info">{location} | {date}</h3>
    <h2>{company}</h2>
    <h3 class="bottom-info">{position}</h3>
    {#if expanded}
        <div class="bullets" in:slide out:slide>
            <ul>
                {#each bullets as bullet}
                    <li>{bullet}</li>
                {/each}
            </ul>
        </div>
    {:else if bullets.length > 0}
        <i class="arrow" out:fade in:fade></i>
    {/if}
</div>

<style>
    .work-card {
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        backdrop-filter: blur(5px);
        padding: 20px;
        margin-bottom: 20px;
        transition: 0.3s;
        color: var(--color-secondary);
    }

    .work-card h2 {
        margin: 10px 0;
        font-size: 1.5em;
        color: var(--color-primary);
    }
    
    .work-card p {
        font-size: 1em;
        margin: 3px 0;
    }

    .work-card img {
        min-height: 50;
    }

    .work-card:hover {
        transform: scale(1.03);
    }

    .work-card:hover .arrow {
        animation: bounce 1s infinite;
    }

    .logo-corner {
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .arrow {
        border: solid var(--color-secondary);
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        text-align: center;
        position: absolute;
        bottom: 20px;
        right: 30px;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0) rotate(45deg); }
        50% { transform: translateY(-5px) rotate(45deg); }
    }

    @media only screen and (max-width: 768px) {
        img {
            display: none;
        }

        .top-info {
            font-size: 0.7em;
        }

        .bottom-info {
            font-size: 0.9em;
        }

        .bullets {
            font-size: 0.7em;
        }
	}
</style>
