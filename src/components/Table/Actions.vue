<template>
    <div class="btn-group btn-group-xs">
        <template v-if="actions.length === 1">
            <a @click="click(actions[0])" class="btn btn-default" v-tooltip="actions[0].tooltip">
                <i :class="actions[0].icon" v-if="actions[0].icon"/>
                <template v-else>{{ actions[0].value }}</template>
            </a>
        </template>

        <template v-if="actions.length > 1">
            <button type="button" class="btn btn-default dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true"
                    v-tooltip="'Выберите действие'"
                    aria-expanded="false">
                <span class="caret"/>
            </button>
            <ul class="dropdown-menu pull-right">
                <li v-for="action in actions">
                    <a href="#" @click="click(action)" v-tooltip="action.tooltip">
                        {{ action.value }}
                    </a>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            rowData: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                actions: [],
            }
        },
        methods: {
            click(action) {
                this[action.method]();
            }
        }
    }
</script>

<style scoped>
    .dropdown-menu li a {
        cursor: pointer !important;
    }
</style>