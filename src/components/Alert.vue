<template>
    <div :class="wrapperClass">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" v-if="dismissable" @click="dismiss">
            ×
        </button>
        <h3 class="font-w300 push-15" v-if="title">{{ title }}</h3>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            message: String,
            dismissable: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'info'
            }
        },
        computed: {
            wrapperClass() {
                let wrapperClass = `alert alert-${this.type}`;

                if (this.dismissable) {
                    wrapperClass += ` alert-dismissable`;
                }

                return wrapperClass;
            }
        },
        methods: {
            dismiss() {
                this.$emit('dismissed');
            }
        }
    }
</script>
