<template>
    <li class="nav-main-item" :class="{ 'open': isOpen }">
        <a href="#" class="nav-main-link nav-main-link-submenu" @click.prevent="toggle">
            <i class="nav-main-link-icon" :class="item.icon"></i><span class="sidebar-mini-hide">{{ resolveTitle(item.title) }}</span>
        </a>

        <ul class="nav-main-submenu">
            <li class="nav-main-item" v-for="child in item.children">
                <router-link class="nav-main-link" :to="child.route" active-class="active">{{ resolveTitle(child.title) }}</router-link>
            </li>
        </ul>
    </li>
</template>

<script>
    import Item from './Item';
    import titleResolver from './titleResolver';
    import isEqual from 'lodash/isEqual';

    export default {
        components: {Item},
        props: {
            item: Object
        },
        computed: {
            hasActiveChild() {
                return this.item.children
                    .some(element =>
                        element.route.name === this.$route.name && isEqual(this.$route.params, element.route.params)
                    );
            },
        },
        data() {
            return {
                isOpen: this.hasActiveChild
            };
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
            resolveTitle(title) {
                return titleResolver(title);
            }
        },
    }
</script>

<style scoped>
    a:focus {
        background: transparent;
    }
</style>
