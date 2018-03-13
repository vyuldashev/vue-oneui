<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <textarea
                class="form-control"
                type="text"
                :rows="rows"
                :value="value"
                @input="update($event.target.value)"
                :disabled="disabled"
        ></textarea>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            value: {
                default: ''
            },
            hasErrors: Boolean,
            error: String,
            disabled: {
                type: Boolean,
                default: false
            },
            rows: {
                type: Number,
                default: 5
            }
        },
        methods: {
            update(value) {
                this.$emit('input', value);
            }
        }
    }
</script>

<style scoped>

</style>