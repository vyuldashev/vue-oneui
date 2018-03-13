<template>
    <div :id="id" class="block block-rounded block-opt-refresh-icon6">
        <div class="block-header bg-gray-lighter">
            <ul class="block-options">
                <slot name="options" v-bind="initial"></slot>

                <li v-if="allowFullscreen">
                    <button type="button" @click="toggleFullscreen"><i class="si si-size-fullscreen"></i></button>
                </li>
                <li>
                    <button type="button" @click="toggle">
                        <i class="si" :class="{ 'si-arrow-up': !toggled, 'si si-arrow-down': toggled }"></i>
                    </button>
                </li>
            </ul>
            <h3 class="block-title">{{ title }}</h3>
        </div>
        <div class="block-content block-content-full">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            loading: {
                type: Boolean,
                default: false
            },
            allowFullscreen: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                toggled: false,
            }
        },
        computed: {
            id() {
                return 'block-' + this._uid;
            },
            initial() {
                return {
                    blockId: this.id
                };
            }
        },
        methods: {
            stateLoading() {
                App.blocks('#' + this.id, 'state_loading');
            },
            stateNormal() {
                App.blocks('#' + this.id, 'state_normal');
            },
            toggle() {
                this.toggled = !this.toggled;

                App.blocks('#' + this.id, 'content_toggle');
            },
            toggleFullscreen() {
                App.blocks('#' + this.id, 'fullscreen_toggle');
            }
        },
        mounted() {
            if (this.loading) this.stateLoading();
        },
        updated() {
            this.loading ? this.stateLoading() : this.stateNormal();
        }
    }
</script>
