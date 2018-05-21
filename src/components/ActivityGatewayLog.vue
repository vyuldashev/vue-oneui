<template>
    <oneui-block title="Логи" :loading="loading">
        <activity-log slot="content"
                      :loading="loading"
                      :items="items"
                      :heading="item => `${item.description} - ${filterDatetime(item.created_at)}`"
        >
            <div class="row" slot="item" slot-scope="props">
                <div class="col-md-12">
                    <oneui-form-input :label="$t('response_code')"
                                      :value="props.item.properties.response_code"
                                      :disabled="true"/>
                    <oneui-form-input :label="$t('comments')"
                                      :value="props.item.properties.comments"
                                      :disabled="true"/>

                    <b>{{ $t('request') }}</b>
                    <formatted-code :content="props.item.properties.request"/>

                    <b>{{ $t('response') }}</b>
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
        i18n: {
            messages: {
                en: {
                    request: 'Request',
                    response: 'Response',
                    response_code: 'Response code',
                    comments: 'Comments',
                },
                ru: {
                    request: 'Запрос',
                    response: 'Ответ',
                    response_code: 'Код ответа',
                    comments: 'Комментарии',
                },
            },
        }
    }
</script>

<style scoped>

</style>