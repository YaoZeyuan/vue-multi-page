<template>
    <div>
        <article>
            <header class="entry-header">
                <h2 class="title">{{post.title}}</h2>
            </header><!-- .entry-header -->

            <div class="entry-content">
                {{post.excerpt}}
            </div>
            <br/>
            <footer class="entry-footer">
                <span class="posted-on"><span class="screen-reader-text">发布于 </span><time>{{post.date}}</time></span>
                <span class="cat-links"><span class="screen-reader-text">分类 </span>
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
        max-width:60rem
    }
    header h2{
        text-align:left;
    }
    div.entry-content{
        text-align:left;
    }
    footer{
        text-align: left;
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
    }
</script>
