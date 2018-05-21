<template>
    <div class="form-group">
        <input :value="value ? value : $t('value')"
               class="btn"
               :class="type"
               @click="$emit('click')"
               type="button"
               :disabled="disabled">
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
            },
            type: {
                type: String,
                default: 'btn-primary'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        i18n: {
            messages: {
                en: {
                    value: 'Submit',
                },
                ru: {
                    value: 'Сохранить',
                },
            },
        },
    }
</script>
