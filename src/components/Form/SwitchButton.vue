<style scoped>
    .css-input > input[disabled] + span {
        cursor: not-allowed;
        opacity: .5;
    }
</style>

<template>
    <label class="css-input switch switch-sm" :class="[`switch-${color}`]">
        <input type="checkbox" :checked="value" :disabled="disabled" @change="handleChange">
        <span></span> {{ title }}
    </label>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: 'primary'
            },
            value: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            handleChange(event) {
                this.$emit('input', event.target.checked);
            }
        }
    }
</script>