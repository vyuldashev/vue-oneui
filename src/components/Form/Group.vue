<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>

        <slot/>

        <div class="help-block" v-for="hint in hints">{{ hint }}</div>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            hasErrors: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
                default: null
            },
            hints: Array,
        }
    }
</script>

<style scoped>

</style>