<template>
    <li class="dropdown" v-if="hasAnyVisibleItem">
        <button type="button" data-toggle="dropdown"><i class="si si-settings"/></button>
        <ul class="dropdown-menu dropdown-menu-right">
            <action-item v-for="(item, index) in items" v-bind="item" :key="index"/>
        </ul>
    </li>
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

</style>