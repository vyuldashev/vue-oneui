<template>
    <div class="btn-group btn-group-sm">
        <template v-if="actions.length === 1 && checkCondition(actions[0])">
            <a :href="actions[0].download" class="btn btn-default" v-tooltip="actions[0].tooltip"
               v-if="actions[0].hasOwnProperty('download')" download>
                <i :class="actions[0].icon" v-if="actions[0].icon"/>
                <template v-else>{{ actions[0].value }}</template>
            </a>

            <a @click="click(actions[0])" class="btn btn-default" v-tooltip="actions[0].tooltip"
               v-if="actions[0].method">
                <i :class="actions[0].icon" v-if="actions[0].icon"/>
                <template v-else>{{ actions[0].value }}</template>
            </a>

            <router-link class="btn btn-default" :to="actions[0].routerLink" v-if="actions[0].routerLink"
                         v-tooltip="actions[0].tooltip">
                <i :class="actions[0].icon" v-if="actions[0].icon"/>
                <template v-else>{{ actions[0].value }}</template>
            </router-link>
        </template>
        <template v-if="actions.length > 1 && checkConditions">
            <button type="button" class="btn btn-default dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                <span class="caret"/>
            </button>
            <div class="dropdown-menu pull-right">
                <template v-for="action in actions">
                    <template v-if="checkCondition(action)">
                        <a class="dropdown-item" :href="action.download" v-tooltip="action.tooltip"
                           v-if="action.hasOwnProperty('download')" download>
                            {{ action.value }}
                        </a>

                        <a class="dropdown-item" href="#" @click.prevent="click(action)" v-tooltip="action.tooltip" v-if="action.method">
                            {{ action.value }}
                        </a>

                        <router-link class="dropdown-item" :to="action.routerLink" v-if="action.routerLink" v-tooltip="action.tooltip">
                            {{ action.value }}
                        </router-link>
                    </template>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
    import isFunction from 'lodash/isFunction';

    export default {
        props: {
            rowData: {
                type: Object,
                required: true,
            },
            rowIndex: {
                type: [String, Number]
            }
        },
        computed: {
            actions: () => [],
            checkConditions() {
                return this.actions.some(action => this.checkCondition(action));
            }
        },
        methods: {
            click(action) {
                this[action.method]();
            },
            checkCondition(action) {
                if (!isFunction(action.condition)) {
                    return true;
                }

                return action.condition();
            }
        }
    }
</script>

<style scoped>
    .dropdown-menu li a {
        cursor: pointer !important;
    }
</style>
