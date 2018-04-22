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
                default: 'DD.MM.YYYY HH:mm'
            }
        },
        mounted() {
            $(this.$refs.input)
                .datetimepicker({
                    locale: 'ru',
                    format: this.format,
                    sideBySide: true,
                    minDate: this.minDate,
                    maxDate: this.maxDate
                })
                .on('dp.change', ({date}) => {
                    this.$emit('input', date ? date.format(this.format) : '');
                })
        }
    }
</script>
