<template>
    <ul class="pagination pagination-sm" v-if="items.length > 1">
        <li v-if="hasPreviousPage"><a @click="changePage(currentPage - 1)" rel="prev">«</a></li>
        <li class="disabled" v-else><span>«</span></li>

        <li v-for="item in items" :class="{'disabled': item === '...', 'active': item === currentPage }">
            <a v-if="item !== '...'" @click="changePage(item)">{{ item }}</a>
            <span v-else>{{ item }}</span>
        </li>

        <li v-if="hasNextPage"><a @click="changePage(currentPage + 1)" rel="next">»</a></li>
        <li class="disabled" v-else><span>»</span></li>
    </ul>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default: () => ({
                    current_page: 1,
                    prev_page_url: null,
                    next_page_url: null,
                    last_page: 1,
                    from: 1,
                    total: 0,
                    pagination: []
                })
            }
        },
        computed: {
            hasPreviousPage() {
                if (this.data.hasOwnProperty('prev_page_url')) {
                    return this.data.prev_page_url !== null;
                }

                // Takes from response.meta
                return this.currentPage !== 1;
            },
            hasNextPage() {
                if (this.data.hasOwnProperty('next_page_url')) {
                    return this.data.next_page_url !== null;
                }

                // Takes from response.meta
                if (this.data.hasOwnProperty('last_page')) {
                    return this.currentPage < this.data.last_page;
                }

                return false;
            },
            currentPage() {
                return this.data.hasOwnProperty('current_page') ? this.data.current_page : 1;
            },
            items() {
                if (this.data.hasOwnProperty('pagination')) {
                    return this.data.pagination.map(url => url !== '...' ? parseInt(new URL(url).searchParams.get('page')) : url);
                }

                return [];
            },
            from() {
                return this.data.hasOwnProperty('from') ? this.data.from : 1;
            },
            lastPage() {
                return this.data.hasOwnProperty('last_page') ? this.data.last_page : 1;
            },
            paginationParameters() {
                return {
                    from: this.from,
                    last_page: this.lastPage
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
</style>