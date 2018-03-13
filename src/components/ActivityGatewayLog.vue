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
                    <pre class="pre-sh">
                        <code class="hljs" :class="codeClass(props.item.properties.request)">{{ formatCode(props.item.properties.request) }}</code>
                    </pre>

                    <b>Ответ</b>
                    <pre class="pre-sh">
                        <code class="hljs" :class="codeClass(props.item.properties.response)">{{ formatCode(props.item.properties.response) }}</code>
                    </pre>
                </div>
            </div>
        </activity-log>
    </oneui-block>
</template>

<script>
    import Vue from 'vue';
    import ActivityLog from './ActivityLog';
    import xmlFormatter from 'xml-formatter';

    export default {
        components: {ActivityLog},
        props: {
            loading: Boolean,
            items: Array,
        },
        methods: {
            filterDatetime(value) {
                return Vue.filter('datetime')(value);
            },
            codeClass(value) {
                if (typeof value === 'object') {
                    return 'json';
                }

                return 'xml';
            },
            formatCode(value) {
                if (typeof value === 'object') {
                    return value;
                }

                const xmlParser = new DOMParser();

                if (xmlParser.parseFromString(value, "text/xml").nodeName !== "parsererror") {
                    value = xmlFormatter(value);
                }

                this.$nextTick(() => {
                    $('pre code').each(function (i, block) {
                        hljs.highlightBlock(block);
                    });
                });

                return value;
            }
        },
    }
</script>

<style scoped>

</style>