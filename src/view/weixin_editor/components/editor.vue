<template>
    <!-- vue要求每个组件中都有且只能有一个根元素 -->
    <div class="base">
        <div class="editor">
            <textarea rows=20 cols="20" v-model=html></textarea>
        </div>
        <hr>
        <div class="preview">
            <preview :html="html"></preview>
        </div>
    </div>
</template>

<style scoped>
    /*  style标签之内会被作为css进行处理，所以需要使用css的注释形式   */
    /*  加上scoped可以将css的作用效果限定在该组件之内 */
    .base {
        text-align: center;
        font-family: sans-serif;
        margin-top: 2rem;
    }
    .editor textarea{
        width: 670px;
        height: 20rem;
    }
</style>

<script>
    import preview from './item/preview.vue'

    export default {
        data: function () {
            return {
                html : "<b>123</b>", // html源代码
            }
        },
        methods: {

        },
        computed:{
            text:function () {
                return this.html
            }
        },
        components: {
            preview,
        }
    }
</script>
