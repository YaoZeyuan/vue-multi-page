<template>
    <div>
        <template v-if="loading">
            <loading></loading>
        </template>
        <template v-else>
            <article>
                <header class="entry-header">
                    <h2 class="title">{{post.title.rendered}}</h2>
                </header><!-- .entry-header -->

                <div class="entry-content" v-html=post.content.rendered>
                </div>
                <br/>
                <footer class="entry-footer">
                    <span class="posted-on"><span class="screen-reader-text">发布于 </span><time>{{post.date}}</time></span>
                    <span class="cat-links" v-if="post.tags.length"><span class="screen-reader-text">分类 </span>
                    <div v-for="tag in post.tags">
                        <a>{{tag}}</a>
                    </div>
                </span>
                </footer>
            </article>
        </template>

        <div class="container">
            <router-link :to="{path: '/'}">
                <customerButton>返回</customerButton>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    a {
        text-decoration: none;
    }

    article {
        background-color: white;
        max-width: 60rem;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e8e8e8;
        box-shadow: inset 1px 1px 1px 0 #cfcfcf;
        border-radius: 3px;
        padding-top: 2rem;
        margin: 0 auto 2rem auto;
    }

    h2.title {
        text-align: center;
    }

    header {
        margin-right: auto;
        margin-left: auto;
    }

    div.entry-content {
        text-align: left;
        margin: 3rem 4rem 3rem 4rem;
    }

    footer {
        text-align: right;
        margin: 0 2rem 2rem 2rem;
    }

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
</style>
<script>
    import customerButton from 'src/components/demo/button'
    import loading from 'src/components/demo/loading'

    export default{
        data(){
            return {
                article_id: this.$route.params.article_id || '1',
                post: {},
                loading: false,
            }
        },
        mounted: function () {
            this.getContent()
        },
        methods: {
            getContent: function () {
                console.info('开始获取数据')
                if (this.is_loading) {
                    console.info(`数据正在加载中，请稍后再试`)
                    return
                }
                this.is_loading = true;
                this.$http.jsonp('http://www.yaozeyuan.online/wp-json/wp/v2/posts/' + this.article_id, {
                    jsonp: '_jsonp',
                }).then((response) => {
                    // success callback
                    console.log(response.body)

                    this.is_loading = false;
                    this.post = response.body
                }, (response) => {
                    console.info(`获取文章列表失败` + '失败原因:网络异常');

                    this.is_loading = false;
                });
            }
        },
        components: {
            customerButton,
            loading,
        }
    }
</script>
