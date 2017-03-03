<template>
    <!-- vue要求每个组件中都有且只能有一个根元素 -->
    <div class="base">
        <div class='article-list'>
            <template v-for="post in post_list">
                <preview :post=post></preview>
            </template>
        </div>
        <load-data v-if="!is_completed" :is_loading="is_loading"  v-on:clicked=getPosts></load-data>
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
</style>

<script>
    import preview from './preview.vue'
    import loadData from './load_data.vue'

    export default {
        data: function () {
            return {
                post_list: [], // 这里使用了数组作为加载
                page: 1,
                count: 5,
                count_total: 0,
                is_loading: false,// 是否正在加载数据
            }
        },
        mounted: function () {
            this.getPosts();
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
                this.$http.jsonp('http://www.yaozeyuan.online/api/get_posts/', {
                    params: {
                        page: this.page,
                        count: this.count,
                    }
                }).then((response) => {
                    // success callback
                    console.log(response.body)

                    this.is_loading = false;
                    if (response.body.status == 'ok') {
                        // 获取成功
                        this.post_list = this.article_list.concat(response.body.posts)
                        this.count_total = response.body.count_total
                        this.page += 1
                    } else {
                        console.info(`获取文章列表失败` + '失败原因:返回值错误');
                    }
                }, (response) => {
                    console.info(`获取文章列表失败` + '失败原因:网络异常');

                    this.is_loading = false;
                });
            }
        },
        computed: {
            is_completed: function () {
                // 我显然写过博客。。。
                return this.count_total == this.post_list.length && this.count_total != 0
            },
            article_list : function () {
                let article_list = []
                for(let post of this.post_list){
                    console.log(post)
                    article_list.push(post)
                }
                return  article_list
            }

        },
        components: {
            'preview': preview,
            loadData,// 也可以这样导入
            // 驼峰式命名的组件会被自动转换成横线分隔的组件名
        }
    }
</script>
