<template>
    <li v-if="value(visible)">
        <router-link v-if="route" :to="value(route)">{{ value(text) }}</router-link>
        <a v-else href="#" @click.prevent="handleClick()">{{ value(text) }}</a>
    </li>
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