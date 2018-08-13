<template>
    <div :id="id" :class="blockClasses">
        <div class="block-header" :class="background">
            <ul class="block-options">
                <slot name="options" v-bind="initial"/>

                <li v-if="allowFullscreen">
                    <button type="button" @click="toggleFullscreen"><i class="si si-size-fullscreen"/></button>
                </li>
                <li>
                    <button type="button" @click="toggle">
                        <i class="si" :class="{ 'si-arrow-up': !toggled, 'si si-arrow-down': toggled }"/>
                    </button>
                </li>
            </ul>
            <h3 class="block-title">{{ title }}</h3>
        </div>
        <div class="block-content block-content-full">
            <slot name="content"/>
        </div>
        <div class="block-content block-content-full bg-gray-lighter" v-if="$slots['footer']">
            <slot name="footer"/>
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
            },
            hasErrors: Boolean,
            rounded: {
                type: Boolean,
                default: true
            },
            transparent: Boolean,
        },
        data: () => ({
            fullscreen: false,
            toggled: false,
        }),
        computed: {
            id() {
                return 'block-' + this._uid;
            },
            blockClasses() {
                return {
                    block: true,
                    'block-opt-refresh-icon6': true,
                    'block-opt-refresh': this.loading,
                    'block-transparent': this.transparent,
                    'block-rounded': this.rounded,
                    'block-opt-hidden': this.toggled,
                    'block-opt-fullscreen': this.fullscreen,
                    'block-themed': this.hasErrors,
                };
            },
            initial() {
                return {
                    blockId: this.id
                };
            },
            background() {
                return this.hasErrors ? 'bg-city' : 'bg-gray-lighter';
            },
        },
        methods: {
            toggle() {
                this.toggled = !this.toggled;
            },
            toggleFullscreen() {
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>

<style>
    .block-themed ul.block-options i {
        color: #FFFFFF;
    }
</style>
