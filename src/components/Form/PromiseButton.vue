<template>
    <button type="button" :class="classes" @click="handleClick" :disabled="isDisabled">
        <slot name="processing" v-if="processing"><i class="fa fa-spin fa-cog"/></slot>
        <slot v-else>{{ value ? value : $t('submit') }}</slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: null,
            },
            onClick: {
                type: Function,
                default: () => Promise.resolve()
            },
            value: {
                type: String,
            },
            block: Boolean,
            disabled: Boolean
        },
        computed: {
            classes() {
                return {
                    'btn': true,
                    [`btn-${this.type}`]: true,
                    [`btn-${this.size}`]: this.size !== null,
                    'btn-block': this.block
                };
            },
            isDisabled() {
                return this.disabled || this.processing;
            }
        },
        data: () => ({
            processing: false
        }),
        methods: {
            handleClick() {
                this.startProcessing();

                this.onClick().then(() => this.stopProcessing(), () => this.stopProcessing());
            },
            startProcessing() {
                this.processing = true;
            },
            stopProcessing() {
                this.processing = false;
            }
        },
        i18n: {
            messages: {
                en: {
                    submit: 'Submit',
                },
                ru: {
                    submit: 'Сохранить',
                },
            }
        }
    }
</script>

<style scoped>

</style>