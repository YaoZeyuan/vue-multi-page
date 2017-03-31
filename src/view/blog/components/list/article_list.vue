<template>
    <!-- vue要求每个组件中都有且只能有一个根元素 -->
    <div class="base">
        <div class="logo">
            <a href="https://www.yaozeyuan.online"  title="引入图片示例-博客主站">
                <img src="/img/blog/logo/logo.png" alt="引入图片示例" title="引入图片示例">
            </a>
        </div>
        <div class='article-list'>
            <template v-for="post in post_list">
                <preview :post=post></preview>
            </template>
        </div>
        <load-data v-if="!is_completed" :is_loading="is_loading" v-on:clicked=getPosts></load-data>
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

    .logo {
        position: fixed;
        width: 100%;
        height: 2rem;
        margin-top: -2rem;
    }
    .logo img{
        float: right;
        width: 2rem;
        margin-right: 0.5rem;
        margin-top: 0.5rem;
    }
</style>

<script>
    import preview from './preview.vue'
    import loadData from './load_data.vue'

    import blog_demo from "src/lib/blog_demo"

    export default {
        data: function () {
            return {
                post_list: [], // 这里使用了数组作为加载
                page: 1,
                per_page: 5,
                loaded_article_count: 0, // 本次载入了多少篇文章
                is_loading: false,// 是否正在加载数据
            }
        },
        mounted: function () {
            this.getPosts();
            blog_demo.log(`本地js扩展调用示例`)
        },
        methods: {
            getPosts: function () {
                console.info('开始获取数据')
                if (this.is_completed) {
                    console.info(`全部数据已加载完毕，不需要再请求数据了`)
                    return
                }
                if (this.is_loading) {
                    console.info(`数据正在加载中，请稍后再试`)
                    return
                }
                this.is_loading = true;
                this.$http.jsonp(
                    'http://www.yaozeyuan.online/wp-json/wp/v2/posts', {
                        jsonp: '_jsonp',// vue-resource目前只能用这种方式修改jsonp参数，将来要考虑更换ajax插件
                        params: {
                            page: this.page,
                            per_page: this.per_page,
                        }
                    }).then((response) => {
                    // success callback
                    console.log(response.body)

                    this.is_loading = false;
                    // 获取成功
                    this.post_list = this.article_list.concat(response.body)
                    this.loaded_article_count = response.body.length
                    this.page += 1
                }, (response) => {
                    console.info(`获取文章列表失败` + '失败原因:网络异常');
                    this.is_loading = false;
                });
            }
        },
        computed: {
            is_completed: function () {
                // 我显然写过博客。。。
                return this.loaded_article_count == 0 && this.post_list.length != 0
            },
            article_list: function () {
                let article_list = []
                for (let post of this.post_list) {
                    console.log(post)
                    article_list.push(post)
                }
                return article_list
            }

        },
        components: {
            'preview': preview,
            loadData,// 也可以这样导入
            // 驼峰式命名的组件会被自动转换成横线分隔的组件名
        }
    }
</script>
