<template>
    <div>
        <li class="nav-main-heading">{{ title }}</li>
        <factory v-for="(child, index) in item.items" :item="child" :key="index"></factory>
    </div>
</template>

<script>
    import Factory from './Factory';
    import titleResolver from './titleResolver';

    export default {
        components: {Factory},
        props: {
            item: Object
        },
        computed: {
            title() {
                return titleResolver(this.item.title);
            },
        },
    }
</script>

<style scoped>

</style>
