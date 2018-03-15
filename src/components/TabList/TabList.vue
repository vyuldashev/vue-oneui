<template>
    <div :class="blockClasses">
        <ul class="nav nav-tabs">
            <li v-for="(tab, index) in tabs" :class="tabClasses(index)">
                <a href="#" @click="setCurrent($event, index)">
                    {{ tab.label }}
                </a>
            </li>
            <li class="pull-right">
                <ul class="block-options push-10-t push-10-r">
                    <slot name="options"/>
                    <li v-if="fullscreen">
                        <button type="button" @click="toggleScreen">
                            <size-icon :increased="state.fullscreen"/>
                        </button>
                    </li>
                    <li v-if="!state.fullscreen">
                        <button type="button" @click="toggleCollapse">
                            <arrow-icon :direction="state.collapsed ? 'up' : 'down'"/>
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="block-content tab-content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import ArrowIcon from '../Icons/Arrow';
    import SizeIcon from '../Icons/Size';

    export default {
        props: {
            fullscreen: Boolean,
            loading: Boolean
        },
        components: {ArrowIcon, SizeIcon},
        data: () => ({
            current: 0,
            tabs: [],
            state: {
                collapsed: true,
                fullscreen: false
            },
        }),
        computed: {
            blockClasses() {
                return {
                    block: true,
                    'block-opt-hidden': !this.state.collapsed,
                    'block-opt-fullscreen': this.state.fullscreen,
                    'block-opt-refresh': this.loading
                }
            }
        },
        methods: {
            tabClasses(index) {
                return {
                    active: index === this.current
                };
            },
            setCurrent(event, index) {
                event.preventDefault();

                this.current = index;

                this.tabs.forEach((tab, position) => {
                    tab.setActive(index === position);
                });
            },
            toggleCollapse() {
                this.state.collapsed = !this.state.collapsed;
            },
            toggleScreen() {
                this.state.fullscreen = !this.state.fullscreen;
            }
        },
        mounted() {
            this.tabs = this.$slots.default
                .filter(slot => slot.componentInstance)
                .map(slot => slot.componentInstance);

            if (this.tabs[this.current]) {
                this.tabs[this.current].setActive(true);
            }
        }
    }
</script>

<style scoped>

</style>