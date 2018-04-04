<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <input ref="input" type="text" class="form-control" :value="value"/>
        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            hasErrors: Boolean,
            error: String,
        },
        mounted() {
            $(this.$refs.input)
                .datetimepicker({
                    locale: 'ru',
                    sideBySide: true
                })
                .on('dp.change', ({date}) => {
                    this.$emit('input', date ? date.format('DD.MM.YYYY HH:mm') : '');
                })
        }
    }
</script>
