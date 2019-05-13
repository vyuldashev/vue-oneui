<template>
    <nav id="sidebar">
        <div id="sidebar-scroll">
            <div class="sidebar-content">
                <div class="side-header side-content bg-white-op">
                    <button class="btn btn-link text-gray pull-right hidden-md hidden-lg"
                            type="button"
                            @click="$emit('sidebarClose')">
                        <i class="fa fa-times"></i>
                    </button>
                    <router-link class="h5 text-white" :to="{ name: 'dashboard' }">
                        <slot name="logo"/>
                    </router-link>
                </div>

                <div class="side-content side-content-full">
                    <ul class="nav-main">
                        <factory v-for="(item, index) in filtered" :item="item" :key="index"></factory>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapState } from 'vuex';

    import Factory from './Sidebar/Factory';

    export default {
        components: { Factory },
        props: {
            items: {
                type: Array,
                default: [],
            },
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
            }),
            filtered() {
                const scope = this;

                function copy(o) {
                    return Object.assign({}, o);
                }

                return this.items.map(copy).filter(function allowed(element) {
                    if (element.hasOwnProperty('route')) {
                        const { route } = scope.$router.resolve(element.route);

                        if (route.hasOwnProperty('meta') && route.meta.hasOwnProperty('permission')) {
                            const permission = route.meta.permission;

                            if (typeof permission === 'function') {
                                return permission(scope.user);
                            }

                            if (typeof permission === 'string') {
                                return scope.user.permissions.contains(permission)
                                    || permission === 'auth'
                                    || permission === 'public';
                            }
                        }

                        return false;
                    }

                    if (element.hasOwnProperty('items')) {
                        return (element.items = element.items.map(copy).filter(allowed)).length > 0;
                    }

                    if (element.hasOwnProperty('children')) {
                        return (element.children = element.children.map(copy).filter(allowed)).length > 0;
                    }

                    return false;
                });
            },
        },
    };
</script>

<style scoped>
    nav#sidebar {
        overflow-y: auto;
    }
</style>