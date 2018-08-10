<template>
    <component :is="resolved" :item="item"/>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        beforeCreate() {
            this.$options.components.Item = require('./Item');
            this.$options.components.Block = require('./Block');
            this.$options.components.Dropdown = require('./Dropdown');
        },
        computed: {
            resolved() {
                if (this.item.hasOwnProperty('items')) {
                    return 'block';
                }

                if (this.item.hasOwnProperty('children')) {
                    return 'dropdown';
                }

                return 'item';
            },
        }
    }
</script>

<style scoped>

</style>