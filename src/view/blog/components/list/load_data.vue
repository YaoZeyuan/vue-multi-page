<template>
    <div>
        <template v-if="is_loading">
            <div>
                <customerLoading is_loading=is_loading></customerLoading>
            </div>
        </template>
        <!-- 载入数据/展示Loading效果-->
        <template v-if="!is_loading">
            <div class="container">
                <customerButton  v-on:clicked=emitClick>加载更多</customerButton>
            </div>
        </template>

    </div>
</template>
<style scoped>
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
    import customerLoading from 'src/components/demo/loading.vue'

    export default{
        props: ['is_loading'],
        components:{
            customerButton,
            customerLoading,
        },
        methods:{
            emitClick:function () {
                console.log('clicked!')
                this.$emit('clicked','test')
            }
        }
    }
</script>
