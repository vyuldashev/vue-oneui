<template>
    <span :class="color">
        <i :class="['si', icon]"></i>
    </span>
</template>

<script>
    export default {
        props: {
            value: {
                type: [Boolean, Number],
                default: false
            }
        },
        computed: {
            color() {
                return this.value ? 'text-success' : 'text-danger';
            },
            icon() {
                return this.value ? 'si-check' : 'si-close';
            }
        }
    }
</script>

<style scoped>

</style>