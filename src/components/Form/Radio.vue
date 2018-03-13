<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label>{{ label }}</label>
        <div class="radio" v-for="item in items">
            <label class="css-input css-radio css-radio-primary">
                <input type="radio"
                       :name="name"
                       :value="item.value"
                       :checked="item.value === value"
                       @change="update"
                />
                <span/> {{ item.title }}
            </label>
        </div>
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
            hasErrors: Boolean,
            error: String,
        },
        computed: {
            name() {
                return `radio-group2-${this._uid}`;
            }
        },
        methods: {
            update(event) {
                this.$emit('input', event.target.value);
            }
        }
    }
</script>

<style scoped>

</style>