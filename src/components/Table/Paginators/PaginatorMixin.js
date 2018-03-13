export default {
    computed: {
        // Should be overridden
        paginationParameters() {
            return {};
        }
    },
    mounted() {
        this.$emit('initialized', this.paginationParameters);
    },
    updated() {
        this.$emit('initialized', this.paginationParameters);
    }
}