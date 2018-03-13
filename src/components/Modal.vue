<template>
    <div :id="id" class="modal fade" role="dialog" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="title">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <h5 class="modal-title">{{ title }}</h5>
                </div>

                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            show: {
                required: true,
                type: Boolean
            },
        },
        watch: {
            show(val) {
                const el = $('#' + this.id);

                if (val) {
                    el.modal('show');
                }
                else {
                    el.modal('hide');
                }
            }
        },
        computed: {
            id() {
                return 'modal-' + this._uid;
            }
        },
        mounted() {
            $('#' + this.id).on('hide.bs.modal', (e) => {
                this.$emit('close');
            });
        }
    }
</script>

<style scoped>
    .modal-body {
        white-space: normal;
    }
</style>