<template>
    <div :id="id" class="modal fade" role="dialog" data-backdrop="static">
        <div :class="['modal-dialog', dialogSize]" role="document">
            <div :class="contentClasses">
                <div class="modal-header" v-if="title">
                    <h5 class="modal-title">{{ title }}</h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer" v-if="$slots.footer">
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
            size: {
                type: String,
                default: 'normal'
            },
            loading: Boolean
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
            },
            modalElement() {
                return $('#' + this.id);
            },
            dialogSize() {
                switch (this.size) {
                    case 'large':
                        return 'modal-lg';
                    case 'small':
                        return 'modal-sm';
                    default:
                        return null;
                }
            },
            contentClasses() {
                return {
                    'modal-content': true,
                    'modal-loading': this.loading
                };
            }
        },
        mounted() {
            this.modalElement.on('hide.bs.modal', (e) => {
                this.$emit('close');
            });

            if (this.show) {
                this.modalElement.modal('show');
            }
        },
        beforeDestroy() {
            const elements = document.getElementsByClassName('modal-backdrop');
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
            document.body.classList.remove('modal-open');
        }
    }
</script>

<style lang="scss" scoped>
    .modal-body {
        white-space: normal;
        transition: opacity 0.2s ease-out;
    }

    .modal-content.modal-loading {
        &::before {
            position: absolute;
            display: block;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            content: " ";
        }
        &::after {
            font-family: 'FontAwesome';
            content: "\F1CE";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -20px 0 0 -20px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            color: #646464;
            font-size: 18px;
            text-align: center;
            z-index: 2;
            -webkit-animation: fa-spin 2s infinite linear;
            animation: fa-spin 2s infinite linear;
        }
        > .modal-body {
            opacity: .15;
        }
    }
</style>
