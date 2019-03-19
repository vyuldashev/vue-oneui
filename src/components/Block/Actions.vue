<template>
    <div class="dropdown" v-if="hasAnyVisibleItem">
        <button type="button" data-toggle="dropdown" class="btn btn-sm btn-light dropdown-toggle">
            <i class="si si-settings"/>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
            <action-item v-for="(item, index) in items" v-bind="item" :key="index"/>
        </div>
    </div>
</template>

<script>
    import ActionItem from './ActionItem';

    export default {
        components: {
            ActionItem
        },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        computed: {
            hasAnyVisibleItem() {
                return this.items.some(({visible = true}) => this.value(visible));
            },
        },
        methods: {
            value(value) {
                return typeof value === 'function' ? value() : value;
            }
        },
    }
</script>

<style scoped>
    .dropdown-toggle:after {
        content: none;
    }
</style>
