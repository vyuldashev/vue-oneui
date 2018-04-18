<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label v-if="label">{{ label }}</label>
        <div ref="input" class="input-group date">
            <input type="text"
                   class="form-control"
                   :value="value"
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
            startDate: {
                type: String,
                default: null
            },
            endDate: {
                type: String,
                default: null
            },
            hasErrors: Boolean,
            error: String,
        },
        mounted() {
            $(this.$refs.input)
                .datepicker({
                    format: 'dd.mm.yyyy',
                    autoclose: true,
                    todayHighlight: true,
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                .on('changeDate', (e) => {
                    this.$emit('input', e.format());
                })
              .on('hide', event => {
                event.preventDefault();
                event.stopPropagation();
              });
        }
    }
</script>
