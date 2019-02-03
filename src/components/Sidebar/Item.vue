<template>
    <li class="nav-main-item">
        <router-link :to="item.route" class="nav-main-link" active-class="active" exact>
            <i class="nav-main-link-icon" :class="item.icon"></i>

            <span class="nav-main-link-name">{{ title }}</span>
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
