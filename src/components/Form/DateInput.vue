<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <div ref="input" class="input-group date">
            <input type="text"
                   class="form-control"
                   :value="text"
                   :id="id"
                   :name="name"
                   placeholder="__.__.____"
                   :disabled="disabled">
            <span class="input-group-addon"><i class="si si-calendar"></i></span>
        </div>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>
<script>
    import moment from 'moment';

    const formats = {
        display: 'DD.MM.YYYY',
        broadcast: 'DD.MM.YYYY HH:mm:ss'
    };

    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            minDate: {
                type: String,
                default: null
            },
            maxDate: {
                type: String,
                default: null
            },
            hasErrors: Boolean,
            error: String,
            endOfDay: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            text() {
                if (this.value === '') return '';

                return moment(this.value, formats.broadcast).format(formats.display);
            }
        },
        mounted() {
            $(this.$refs.input)
                .datepicker({
                    format: 'dd.mm.yyyy',
                    autoclose: true,
                    todayHighlight: true,
                    startDate: this.minDate,
                    endDate: this.maxDate
                })
                .on('changeDate clearDate', (e) => {
                    let value = e.format();

                    if (e.date) {
                        value = this.endOfDay ? `${value} 23:59:59` : `${value} 00:00:00`;
                    }

                    this.$emit('input', value);
                })
                .on('hide', event => {
                    event.preventDefault();
                    event.stopPropagation();
                });
        }
    }
</script>
