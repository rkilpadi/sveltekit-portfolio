<script>
    export let location;
    export let date;
    export let company;
    export let position;
    export let image;
    export let bullets = [];
  </script>

<div class="work-card">
    <div class="corner">
        {#if image}
            <img src={image} alt='' width="70">
        {/if}
    </div>
    <h3>{location} | {date}</h3>
    <h2>{company}</h2>
    <h3>{position}</h3>
    {#each bullets as bullet}
        <p>• {bullet}</p>
    {/each}
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
        transform: scale(1.01);
    }

    .corner {
        position: absolute;
        top: 30px;
        right: 30px;
    }

    @keyframes scale {
        from { transform: scale(1); }
        to { transform: scale(1.5); }
    }
</style>
