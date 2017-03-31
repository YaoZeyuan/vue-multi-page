<template>
    <div>
        <div class="loader">Loading...</div>
    </div>
</template>
<style scoped>
    .loader {
        color: darkgray;
        font-size: 12px;
        margin: 3rem auto;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: relative;
        text-indent: -9999em;
        animation: load4 1.3s infinite linear;
        transform: translateZ(0) scale(0.3, 0.3);
    }

    @-webkit-keyframes load4 {
        0%,
        100% {
            box-shadow: 0 -3rem 0 0.2rem, 2rem -2rem 0 0rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 0;
        }
        12.5% {
            box-shadow: 0 -3rem 0 0, 2rem -2rem 0 0.2rem, 3rem 0 0 0, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 -1rem;
        }
        25% {
            box-shadow: 0 -3rem 0 -0.5rem, 2rem -2rem 0 0, 3rem 0 0 0.2rem, 2rem 2rem 0 0, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 -1rem;
        }
        37.5% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0rem 0 0, 2rem 2rem 0 0.2rem, 0 3rem 0 0rem, -2rem 2rem 0 -1rem, -3rem 0rem 0 -1rem, -2rem -2rem 0 -1rem;
        }
        50% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 0rem, 0 3rem 0 0.2rem, -2rem 2rem 0 0, -3rem 0rem 0 -1rem, -2rem -2rem 0 -1rem;
        }
        62.5% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 0, -2rem 2rem 0 0.2rem, -3rem 0 0 0, -2rem -2rem 0 -1rem;
        }
        75% {
            box-shadow: 0rem -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0rem 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 0, -3rem 0rem 0 0.2rem, -2rem -2rem 0 0;
        }
        87.5% {
            box-shadow: 0rem -3rem 0 0, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 0, -3rem 0rem 0 0, -2rem -2rem 0 0.2rem;
        }
    }

    @keyframes load4 {
        0%,
        100% {
            box-shadow: 0 -3rem 0 0.2rem, 2rem -2rem 0 0rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 0;
        }
        12.5% {
            box-shadow: 0 -3rem 0 0, 2rem -2rem 0 0.2rem, 3rem 0 0 0, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 -1rem;
        }
        25% {
            box-shadow: 0 -3rem 0 -0.5rem, 2rem -2rem 0 0, 3rem 0 0 0.2rem, 2rem 2rem 0 0, 0 3rem 0 -1rem, -2rem 2rem 0 -1rem, -3rem 0 0 -1rem, -2rem -2rem 0 -1rem;
        }
        37.5% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0rem 0 0, 2rem 2rem 0 0.2rem, 0 3rem 0 0rem, -2rem 2rem 0 -1rem, -3rem 0rem 0 -1rem, -2rem -2rem 0 -1rem;
        }
        50% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 0rem, 0 3rem 0 0.2rem, -2rem 2rem 0 0, -3rem 0rem 0 -1rem, -2rem -2rem 0 -1rem;
        }
        62.5% {
            box-shadow: 0 -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 0, -2rem 2rem 0 0.2rem, -3rem 0 0 0, -2rem -2rem 0 -1rem;
        }
        75% {
            box-shadow: 0rem -3rem 0 -1rem, 2rem -2rem 0 -1rem, 3rem 0rem 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 0, -3rem 0rem 0 0.2rem, -2rem -2rem 0 0;
        }
        87.5% {
            box-shadow: 0rem -3rem 0 0, 2rem -2rem 0 -1rem, 3rem 0 0 -1rem, 2rem 2rem 0 -1rem, 0 3rem 0 -1rem, -2rem 2rem 0 0, -3rem 0rem 0 0, -2rem -2rem 0 0.2rem;
        }
    }
</style>
<script>
    export default{
        props:['is_loading'],
    }
</script>
