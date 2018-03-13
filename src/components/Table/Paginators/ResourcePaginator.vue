<template>
    <component :is="resolved" :data="transformed" @changePage="changePage" @initialized="initialized"/>
</template>

<script>
    import LengthPaginator from './LengthPaginator';
    import SimplePaginator from './SimplePaginator';

    export default {
        components: {LengthPaginator, SimplePaginator},
        props: {
            data: {
                type: Object,
                default: () => ({
                    links: {},
                    meta: {}
                })
            }
        },
        computed: {
            resolved() {
                if (this.data.meta.hasOwnProperty('total')) {
                    return 'length-paginator';
                }

                return 'simple-paginator';
            },
            transformed() {
                let result = {
                    current_page: this.data.meta.current_page,
                    prev_page_url: this.data.links.prev,
                    next_page_url: this.data.links.next,
                    from: this.data.meta.from,
                };

                if (this.resolved === 'length-paginator') {
                    result.total = this.data.meta.total;
                    result.pagination = this.data.meta.pagination;
                    result.last_page = this.data.meta.last_page;
                }

                return result;
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