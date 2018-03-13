<template>
    <div class="form-group">
        <input :value="value" class="btn" :class="type" @click="$emit('click')" type="button" :disabled="disabled">
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: 'Сохранить'
            },
            type: {
                type: String,
                default: 'btn-primary'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
