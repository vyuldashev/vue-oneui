<template>
    <div :class="classes">
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            label: String
        },
        data: () => ({
            active: false
        }),
        computed: {
            classes() {
                return {
                    'tab-pane': true,
                    active: this.active
                };
            }
        },
        methods: {
            setActive(value) {
                this.active = value;
            }
        }
    }
</script>

<style scoped>

</style>