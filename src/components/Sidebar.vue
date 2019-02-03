<style scoped>
    nav#sidebar {
        overflow-y: auto;
    }
</style>

<template>
    <nav id="sidebar">
        <div class="content-header bg-white-5">
            <!-- Logo -->
            <a class="font-w600 text-dual" href="index.html">
                <router-link class="h5 text-white" :to="{ name: 'dashboard' }">
                    <slot name="logo"/>
                </router-link>
                <!--<span class="smini-hide">-->
                <!--<span class="font-w700 font-size-h5">ne</span> <span class="font-w400">4.0</span>-->
                <!--</span>-->
            </a>
        </div>
        <!--<div id="sidebar-scroll">-->
        <!--<div class="sidebar-content">-->
        <!--<div class="side-header side-content bg-white-op">-->
        <!--<button class="btn btn-link text-gray pull-right hidden-md hidden-lg"-->
        <!--type="button"-->
        <!--@click="$emit('sidebarClose')">-->
        <!--<i class="fa fa-times"></i>-->
        <!--</button>-->
        <!--<router-link class="h5 text-white" :to="{ name: 'dashboard' }">-->
        <!--<slot name="logo"/>-->
        <!--</router-link>-->
        <!--</div>-->

        <div class="content-side content-side-full">
            <ul class="nav-main">
                <factory v-for="(item, index) in filtered" :item="item" :key="index"></factory>
            </ul>
        </div>
        <!--<div class="side-content side-content-full">-->
        <!--<ul class="nav-main">-->
        <!--<factory v-for="(item, index) in filtered" :item="item" :key="index"></factory>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
    </nav>
</template>

<script>
    import {mapState} from 'vuex';

    import Factory from './Sidebar/Factory';

    export default {
        components: {Factory},
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        computed: {
            ...mapState({
                user: state => state.auth.user
            }),
            filtered() {
                const scope = this;

                function copy(o) {
                    return Object.assign({}, o);
                }

                return this.items.map(copy).filter(function allowed(element) {
                    if (element.hasOwnProperty('route')) {
                        const {route} = scope.$router.resolve(element.route);


                        // move to some function hasAccess(route)
                        if (route.hasOwnProperty('meta') && route.meta.hasOwnProperty('permission')) {
                            return scope.user.permissions.indexOf(route.meta.permission) !== -1
                                || route.meta.permission === 'auth'
                                || route.meta.permission === 'public';
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
            }
        }
    }
</script>
