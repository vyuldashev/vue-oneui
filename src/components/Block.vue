<template>
    <div :id="id" class="block block-rounded block-opt-refresh-icon6" :class="{'block-themed': hasErrors}">
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
            },
            background() {
                return this.hasErrors ? 'bg-city' : 'bg-gray-lighter';
            },
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

<style>
    .block-themed ul.block-options i {
        color: #FFFFFF;
    }
</style>
