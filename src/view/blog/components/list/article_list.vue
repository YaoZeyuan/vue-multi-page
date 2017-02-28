<template>
    <!-- vue要求每个组件中都有且只能有一个根元素 -->
    <div class="base">
        <div class='article-list'>
            <template v-for="post in post_list">
                <item :post=post></item>
            </template>
        </div>
    </div>
</template>

<style scoped>
    /*  style标签之内会被作为css进行处理，所以需要使用css的注释形式   */
    /*  加上scoped可以将css的作用效果限定在该组件之内 */
    .base {
        text-align: center;
        font-family: sans-serif;
        background-color: rgb(233,242,249);
    }
</style>

<script>
    import item from './item.vue'
    export default {
        data: function () {
            return {
                post_list: [],
            }
        },
        mounted:function () {
            this.getPosts();
        },
        methods: {
            getPosts: function () {
                this.$http.jsonp('http://www.yaozeyuan.online/api/get_posts/').then((response) => {
                    // success callback
                    console.log(response.body)

                    if (response.body.status == 'ok') {
                        // 获取成功
                        this.post_list = response.body.posts
                    } else {
                        console.info(`获取文章列表失败` + '失败原因:返回值错误');
                    }
                }, (response) => {
                    console.info(`获取文章列表失败` + '失败原因:网络异常');
                });
            }
        },
        components:{
            'item':item,
        }
    }
</script>
