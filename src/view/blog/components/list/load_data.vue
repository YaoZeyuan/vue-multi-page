<template>
    <div>
        <div class="container">
            <!-- 载入数据/展示Loading效果-->
            <template v-if="is_loading">
                <div class='loading'>载入中</div>
            </template>
            <template v-if="!is_loading">
                <div class='next-page '>下一页</div>
            </template>
        </div>

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
    .next-page{
        font-weight: 600;
        padding: 1rem;
        vertical-align: middle;
    }

    .button {
        float: left;
        min-width: 150px;
        max-width: 250px;
        display: block;
        margin: 1em;
        padding: 1em 2em;
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
        height: 100%;
        border: 2px solid #3f51b5;
        z-index: -1;
        border-radius: inherit;
        opacity: 0;
        -webkit-transform: scale3d(0.6, 0.6, 1);
        transform: scale3d(0.6, 0.6, 1);
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
        transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    }
    .button--wapasha.button--inverted::before {
        border-color: #7986cb;
    }
    .button--wapasha:hover {
        background-color: #fff;
        color: #3f51b5;
    }
    .button--wapasha.button--inverted:hover {
        background-color: #37474f;
        color: #7986cb;
    }
    .button--wapasha:hover::before {
        -webkit-transform: scale3d(1, 1, 1);
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
