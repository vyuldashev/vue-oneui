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
            startOfDay: Boolean,
            endOfDay: Boolean
        },
        computed: {
            text() {
                if (this.value === '') return '';

                return moment(this.value, formats.broadcast).format(formats.display);
            }
        },
        methods: {
            resolveDateString(value) {
                if (this.startOfDay) {
                    return `${value} 00:00:00`;
                }

                if (this.endOfDay) {
                    return `${value} 23:59:59`;
                }

                return value;
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
                    this.$emit('input', e.date ? this.resolveDateString(e.format()) : '');
                })
                .on('hide', event => {
                    event.preventDefault();
                    event.stopPropagation();
                });
        }
    }
</script>
