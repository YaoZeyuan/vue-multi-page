<template>
    <div class="base" v-html=html>
    </div>
</template>
<style scoped>
    .base{
        width:670px;
    }
</style>
<script>
    export default{
        props:['html'],

    }
</script>
