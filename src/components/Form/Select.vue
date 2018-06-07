<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <select class="form-control" @change="update" :value="value" :disabled="disabled">
            <option></option>
            <option v-for="item in items" :value="item.value" :selected="item.value == value">{{ item.title }}</option>
        </select>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            items: Array,
            value: {
                default: null
            },
            disabled: Boolean,
            hasErrors: Boolean,
            error: String
        },
        methods: {
            update(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>
