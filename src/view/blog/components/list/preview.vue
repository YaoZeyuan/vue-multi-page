<template>
    <div>
        <article v-on:click="redirect(post.id)">
            <header class="entry-header">
                <h2 class="title">{{post.title.rendered}}</h2>
            </header><!-- .entry-header -->

            <div class="entry-content" v-html=excerpt></div>
            <br/>

            <footer class="entry-footer">
                <span class="posted-on"><span class="screen-reader-text">发布于 </span><time>{{post.date}}</time></span>
                <span class="cat-links" v-if="post.tags.length" ><span class="screen-reader-text">分类 </span>
                    <div v-for="tag in post.tags">
                        <a>{{tag}}</a>
                    </div>
                </span>
            </footer>
        </article>
    </div>
</template>
<style scoped>
    article{
        background-color: white;
        max-width:60rem;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e8e8e8;
        box-shadow: inset 1px 1px 1px 0 #cfcfcf;
        border-radius: 3px;
        padding-top: 2rem;
        margin: 0 auto 2rem auto;
    }

    header{
        margin-right: auto;
        margin-left: auto;
    }

    div.entry-content{
        text-align: left;
        margin: 3rem 4rem 3rem 4rem;
    }

    footer{
        text-align: right;
        margin: 0 2rem 2rem 2rem;
    }
</style>
<script>
    export default{
        props:['post'],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods:{
            redirect:function (article_id) {
                this.$router.push({ name: 'article', params: { article_id: article_id}})
            }
        },
        computed:{
            excerpt : function(){
                return this.post.excerpt.rendered.split('&hellip;')[0] + '&hellip;';
            }
        }
    }
</script>
