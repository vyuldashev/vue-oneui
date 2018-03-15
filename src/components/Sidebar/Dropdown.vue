<template>
    <li :class="{ 'open': isOpen }">
        <a href="#" class="nav-submenu" @click.prevent="toggle">
            <i :class="item.icon"></i><span class="sidebar-mini-hide">{{ item.title }}</span>
        </a>

        <ul>
            <li v-for="child in item.children">
                <router-link :to="child.route" active-class="active">{{ child.title }}</router-link>
            </li>
        </ul>
    </li>
</template>

<script>
    import Item from './Item';
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
            }
        },
        data() {
            return {
                isOpen: this.hasActiveChild
            };
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            }
        }
    }
</script>

<style scoped>
    a:focus {
        background: transparent;
    }
</style>