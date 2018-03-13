<template>
    <div>
        <li class="nav-main-heading"><span class="sidebar-mini-hide">{{ item.title }}</span></li>
        <factory v-for="(child, index) in item.items" :item="child" :key="index"></factory>
    </div>
</template>

<script>
    import Factory from './Factory';

    export default {
        components: {Factory},
        props: {
            item: Object
        },
    }
</script>

<style scoped>

</style>