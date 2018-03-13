<template>
    <div class="pagination" v-if="hasPreviousPage || hasNextPage">
        <ul class="pager">
            <!--Previous Page Link-->
            <li v-if="hasPreviousPage"><a @click="changePage(currentPage - 1)" rel="prev">« Назад</a></li>
            <li class="disabled" v-else><span>« Назад</span></li>

            <!--Next Page Link-->
            <li v-if="hasNextPage"><a @click="changePage(currentPage + 1)" rel="next">Вперёд »</a></li>
            <li class="disabled" v-else><span>Вперёд »</span></li>
        </ul>
    </div>
</template>

<script>
    import mixin from './PaginatorMixin';

    export default {
        mixins: [mixin],
        props: {
            data: {
                type: Object,
                default: () => ({
                    current_page: 1,
                    prev_page_url: null,
                    next_page_url: null,
                    from: 1
                })
            }
        },
        computed: {
            currentPage() {
                return this.data.hasOwnProperty('current_page') ? this.data.current_page : 1;
            },
            hasPreviousPage() {
                return this.data.hasOwnProperty('prev_page_url') ? this.data.prev_page_url !== null : false;
            },
            hasNextPage() {
                return this.data.hasOwnProperty('next_page_url') ? this.data.next_page_url !== null : false;
            },
            from() {
                return this.data.hasOwnProperty('from') ? this.data.from : 1;
            },
            paginationParameters() {
                return {
                    from: this.from,
                    // Infinity - in simple pagination dont return last_page
                    last_page: Infinity
                };
            }
        },
        methods: {
            changePage(page) {
                this.$emit('changePage', page);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        margin: 0;
        li {
            cursor: pointer;
            &.disabled {
                cursor: not-allowed;
            }
        }
    }

    .pager {
        margin: 0;
    }
</style>