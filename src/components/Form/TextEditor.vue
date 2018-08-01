<template>
    <textarea ref="input"
              :rows="rows"
              :value="value"
              :disabled="disabled"
    ></textarea>
</template>

<script>
    export default {
        props: {
            value: {
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false
            },
            rows: {
                type: Number,
                default: 5
            }
        },
        mounted() {
            let $this = this;

            $(this.$refs.input).summernote({
                callbacks: {
                    onChange: function(contents) {
                        $this.$emit('input', contents);
                    }
                }
            });
        },
        beforeDestroy() {
            $(this.$refs.input).summernote('destroy');
        },
    }
</script>

<style scoped>

</style>