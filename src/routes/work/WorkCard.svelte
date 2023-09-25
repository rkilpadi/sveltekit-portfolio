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
    <div class="corner">
        {#if image}
            <img src={image} alt='' width="70">
        {/if}
    </div>
    <h3>{location} | {date}</h3>
    <h2>{company}</h2>
    <h3>{position}</h3>
    {#if expanded}
        <div in:slide out:slide>
            {#each bullets as bullet}
                <p>• {bullet}</p>
            {/each}
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
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        transition: 0.3s;
    }

    .work-card h2 {
        margin: 10px 0;
        font-size: 1.5rem;
        color: var(--color-primary);
    }
    
    .work-card p {
        font-size: 1rem;
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

    .corner {
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
        left: 95%;
    }

    @keyframes scale {
        from { transform: scale(1); }
        to { transform: scale(1.5); }
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0) rotate(45deg); }
        50% { transform: translateY(-5px) rotate(45deg); }
    }
</style>
