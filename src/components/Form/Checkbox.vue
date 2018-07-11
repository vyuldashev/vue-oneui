<template>
    <div class="form-group" :class="{'has-error': hasError}">
        <label class="css-input switch switch-sm switch-primary">
            <input type="checkbox" @change="update($event.target.checked)" :checked="value">
            <span></span> {{ label }}
        </label>
        <span class="help-block" v-if="hasError">{{ error }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            value: {
                type: Boolean,
                default: false
            },
            hasError: Boolean,
            error: String
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
