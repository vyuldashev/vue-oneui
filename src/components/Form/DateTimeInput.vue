<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }" v-on-clickaway="hide">
        <label v-if="label">{{ label }}</label>
        <input ref="input" type="text" class="form-control" :value="value" @click="toggle"/>
        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        mixins: [ clickaway ],
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            minDate: {
                default: false
            },
            maxDate: {
                default: false
            },
            hasErrors: Boolean,
            error: String,
            format: {
                type: String,
                default: 'DD.MM.YYYY HH:mm',
            },
        },
        mounted() {
            $(this.$refs.input).datetimepicker({
                locale: 'ru',
                format: this.format,
                sideBySide: true,
                minDate: this.minDate,
                maxDate: this.maxDate
            });

            $(this.$refs.input).on('change.datetimepicker', ({date}) => {
                this.$emit('input', date ? date.format(this.format) : '');
            });
        },
        methods: {
            toggle() {
                $(this.$refs.input).datetimepicker('toggle');
            },
            hide() {
                $(this.$refs.input).datetimepicker('hide');
            },
        },
    }
</script>

<style scoped>
    input::-ms-clear {
        display: none;
    }
</style>
