<!-- 基础目录组件，用于渲染路由页面 -->
<template>
    <div>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <div>
            <!--实际页面内容-->
            <router-view></router-view>
        </div>
    </div>
</template>

<style >
/*  style标签之内会被作为css进行处理，所以需要使用css的注释形式   */
/*  加上scoped可以将css的作用效果限定在该组件之内 */
    html{
        /* 添加到这里，为网页加上背景色 */
        background-color: rgb(233,242,249);
    }
</style>

<script>
    export default {
        data: function () {
            return {
                msg: 'Use Vue 2.0 Today!'
            }
        },
    }
</script>
