<template>
    <div class="base" v-html=html>
    </div>
</template>
<style scoped>
    .base{
        width:670px;
        margin: 0 auto;
        border-color: rgba(0, 188, 212, 0.59);
        border-style: dotted;
        border-width: 2px;
    }
</style>
<script>
    export default{
        props:['html'],

    }
</script>
