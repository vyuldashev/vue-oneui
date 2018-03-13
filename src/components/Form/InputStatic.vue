<template>
    <div class="form-group">
        <label class="col-xs-3 control-label" v-if="label" v-tooltip="tooltip">{{ label }}</label>
        <div class="col-sm-9">
            <div class="form-control-static">
                <slot>{{ value }}</slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            value: {
                type: [String, Number],
                default: null
            },
            tooltip: String
        }
    }
</script>

<style scoped>

</style>