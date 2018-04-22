<template>
    <pre v-highlightjs="sourcecode"><code class="hljs" :class="codeClass">{{ formatted }}</code></pre>
</template>

<script>
    import xmlFormatter from 'xml-formatter';

    export default {
        props: {
            content: {
                required: true
            }
        },
        computed: {
            codeClass() {
                if (this.content === null) {
                    return null;
                }

                if (this.isJson(this.content)) {
                    return 'json';
                }

                if (this.isXml(this.content)) {
                    return 'xml';
                }

                return null;
            },
            formatted() {
                if (this.content === null) {
                    return null;
                }

                if (this.isJson(this.content)) {
                    return JSON.parse(this.content);
                }
                if (this.isXml(this.content)) {
                    return xmlFormatter(this.content);
                }

                return this.model.settings;
            }
        },
        methods: {
            isJson(value) {
                try {
                    return JSON.parse(value) && !!value;
                } catch (e) {
                    return false;
                }
            },
            isXml(value) {
                try {
                    return (new DOMParser).parseFromString(value, 'text/xml').nodeName !== 'parsererror';
                } catch (e) {
                    return false;
                }
            },
        },
        mounted() {
            this.$nextTick(() => {
                $('pre code.hljs').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            });
        }
    }
</script>

<style scoped>

</style>