<template>
    <oneui-block title="Логи" :loading="loading">
        <activity-log slot="content"
                      :loading="loading"
                      :items="items"
                      :heading="item => `${item.description} - ${filterDatetime(item.created_at)}`"
        >
            <div class="row" slot="item" slot-scope="props">
                <div class="col-md-12">
                    <oneui-form-input label="Код ответа" :value="props.item.properties.response_code"
                                      :disabled="true"/>
                    <oneui-form-input label="Комментарии" :value="props.item.properties.comments"
                                      :disabled="true"/>

                    <b>Запрос</b>
                    <formatted-code :content="props.item.properties.request"/>

                    <b>Ответ</b>
                    <formatted-code :content="props.item.properties.response"/>
                </div>
            </div>
        </activity-log>
    </oneui-block>
</template>

<script>
    import Vue from 'vue';
    import ActivityLog from './ActivityLog';
    import FormattedCode from './FormattedCode';

    export default {
        components: {ActivityLog, FormattedCode},
        props: {
            loading: Boolean,
            items: Array,
        },
        methods: {
            filterDatetime(value) {
                return Vue.filter('datetime')(value);
            },
        },
    }
</script>

<style scoped>

</style>