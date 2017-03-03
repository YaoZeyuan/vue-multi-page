<template>
    <div>
        <div>this is template body</div>
        <router-link :to="{path: '/'}">
            <button>返回</button>
        </router-link>
    </div>
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    export default{
        data(){
            return{
                article_id: this.$route.params.article_id || '1',
                post:{},
                loading:false,
            }
        },
        mounted:function () {
            this.getContent()
        },
        methods:{
            getContent:function () {
                console.info('开始获取数据')
                if (this.is_loading) {
                    console.info(`数据正在加载中，请稍后再试`)
                    return
                }
                this.is_loading = true;
                this.$http.jsonp('http://www.yaozeyuan.online/api/get_post/', {
                    params: {
                        post_id: this.article_id,
                    }
                }).then((response) => {
                    // success callback
                    console.log(response.body)

                    this.is_loading = false;
                    if (response.body.status == 'ok') {
                        // 获取成功
                        this.post = response.body.post
                    } else {
                        console.info(`获取文章列表失败` + '失败原因:返回值错误');
                    }
                }, (response) => {
                    console.info(`获取文章列表失败` + '失败原因:网络异常');

                    this.is_loading = false;
                });
            }
        },
        components:{
        }
    }
</script>
