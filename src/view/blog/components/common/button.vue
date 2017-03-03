<template>
    <div>
        <div class="button button--wapasha button--text-thick button--inverted" v-on:click=emitClick>
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>

    .button {
        font-weight: 600;
        padding: 1rem;

        display: block;
        border: none;
        background: none;
        color: inherit;
        vertical-align: middle;
        text-align: center;
        position: relative;
        z-index: 1;
        -webkit-backface-visibility: hidden;
        -moz-osx-font-smoothing: grayscale;
    }

    .button:focus {
        outline: none;
    }

    /* Wapasha */
    .button.button--wapasha {
        background: #37474f;
        color: #fff;
        -webkit-transition: background-color 0.3s, color 0.3s;
        transition: background-color 0.3s, color 0.3s;
    }

    .button--wapasha.button--inverted {
        background: #fff;
        color: #37474f;
    }

    .button--wapasha::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 60rem;
        height: 99%;
        border: 2px solid black;
        z-index: -1;
        border-radius: inherit;
        opacity: 0;
        transform: scale3d(0.6, 0.6, 1);
        transition: transform 0.3s, opacity 0.3s;
        transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    }

    .button--wapasha.button--inverted::before {
        border-color: rgba(3, 169, 244, 0.24);;
    }

    .button--wapasha.button--inverted:hover {
        background-color: azure;
        color: burlywood;
    }

    .button--wapasha:hover::before {
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }

    .button--text-thick {
        font-weight: 600;
    }
</style>
<script>
    export default{
        methods:{
            emitClick:function () {
                console.log('clicked!')
                this.$emit('clicked','test')
            }
        }
    }
</script>
