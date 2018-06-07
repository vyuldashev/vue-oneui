<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <input
                class="form-control"
                :type="type"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :disabled="disabled"
        />

        <div class="help-block" v-for="hint in hints">{{ hint }}</div>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            type: {
                type: String,
                default: 'text'
            },
            value: {
                default: ''
            },
            hasErrors: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            hints: Array
        }
    }
</script>

<style scoped>
    input::-ms-clear {
        display: none;
    }
</style>
