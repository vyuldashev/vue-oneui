<template>
    <div class="form-group">
        <label class="css-input switch switch-sm switch-primary">
            <input type="checkbox" @change="update($event.target.checked)" :checked="value">
            <span></span> {{ label }}
        </label>
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