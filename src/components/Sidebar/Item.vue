<template>
    <li>
        <router-link :to="item.route" active-class="active" exact>
            <i :class="item.icon"></i><span class="sidebar-mini-hide">{{ title }}</span>
        </router-link>
    </li>
</template>

<script>
    import titleResolver from './titleResolver';

    export default {
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