<template>
    <li>
        <router-link :to="item.route" active-class="active" exact>
            <i :class="item.icon"></i><span class="sidebar-mini-hide">{{ item.title }}</span>
        </router-link>
    </li>
</template>

<script>
    export default {
        props: {
            item: Object
        },
    }
</script>

<style scoped>

</style>