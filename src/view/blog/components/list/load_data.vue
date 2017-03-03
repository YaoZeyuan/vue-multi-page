<template>
    <div>
        <template v-if="is_loading">
            <div>
                <div class="loader">Loading...</div>
            </div>
        </template>
        <!-- 载入数据/展示Loading效果-->
        <template v-if="!is_loading">
            <div class="container">
                <div class='next-page button button--wapasha button--text-thick button--inverted'>加载更多</div>
            </div>
        </template>

    </div>
</template>
<style scoped>
    .container {
        background-color: white;
        max-width: 60rem;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e8e8e8;
        box-shadow: inset 1px 1px 1px 0 #cfcfcf;
        border-radius: 3px;
        margin: 0 auto 0 auto;
    }

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

    .next-page {
        font-weight: 600;
        padding: 1rem;
        vertical-align: middle;
    }

    .button {
        display: block;
        border: none;
        background: none;
        color: inherit;
        vertical-align: middle;
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
        props: ['is_loading'],
    }
</script>
