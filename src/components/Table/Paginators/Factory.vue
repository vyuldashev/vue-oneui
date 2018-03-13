<template>
    <component :is="resolved" :data="data" @changePage="changePage" @initialized="initialized"/>
</template>

<script>
    import LengthPaginator from './LengthPaginator';
    import SimplePaginator from './SimplePaginator';
    import ResourcePaginator from './ResourcePaginator';

    export default {
        components: {LengthPaginator, SimplePaginator, ResourcePaginator},
        props: {
            data: Object
        },
        computed: {
            resolved() {
                if (this.data.hasOwnProperty('meta')) {
                    return 'resource-paginator';
                }

                if (this.data.hasOwnProperty('total')) {
                    return 'length-paginator';
                }

                return 'simple-paginator';
            }
        },
        methods: {
            changePage(page) {
                this.$emit('changePage', page);
            },
            initialized(parameters) {
                this.$emit('initialized', parameters);
            }
        }
    }
</script>

<style scoped>

</style>