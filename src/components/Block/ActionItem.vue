<template>
    <span v-if="value(visible)">
        <router-link v-if="route" :to="value(route)" class="dropdown-item">{{ value(text) }}</router-link>
        <a v-else href="#" @click.prevent="handleClick()" class="dropdown-item">{{ value(text) }}</a>
    </span>
</template>

<script>
    export default {
        props: {
            text: {
                type: [String, Function],
                default: 'Item'
            },
            handleClick: {
                type: Function,
                default: () => {
                },
            },
            visible: {
                type: [Boolean, Function],
                default: true,
            },
            route: {
                type: [Object, Function],
                default: null,
            },
        },
        methods: {
            value(value) {
                return typeof value === 'function' ? value() : value;
            }
        }
    }
</script>

<style scoped>

</style>
