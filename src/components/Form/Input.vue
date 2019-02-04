<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <input
                class="form-control"
                :type="type"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :disabled="disabled"
                :class="{ 'is-invalid': hasErrors }"
        />

        <div class="help-block" v-for="hint in hints">{{ hint }}</div>

        <div class="invalid-feedback animated fadeIn" v-if="hasErrors">{{ error }}</div>
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
