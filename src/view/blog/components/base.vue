<template>
    <!-- vue要求每个组件中都有且只能有一个根元素 -->
    <div class="base">

    </div>
</template>

<style scoped>
    /*  style标签之内会被作为css进行处理，所以需要使用css的注释形式   */
    /*  加上scoped可以将css的作用效果限定在该组件之内 */
    .base {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    a.project-description {
        font-weight: normal;
        font-size: 1.5rem;
        color: #2196f3;
        text-decoration: none;
    }

    a.project-description:hover {
        font-weight: normal;
        font-size: 1.5rem;
        color: #3f51b5;
        text-decoration: none;
    }
</style>

<script>
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
                this.$http.get('http://www.yaozeyuan.online/api/get_posts/').then((response) => {
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
    }
</script>
