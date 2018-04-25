<template>
    <pre v-highlightjs="model" class="pre-sh"><code>{{ model }}</code></pre>
</template>

<script>
    import xmlFormatter from 'xml-formatter';
    import isXml from 'is-xml';

    export default {
        props: {
            content: {
                required: true
            }
        },
        computed: {
            model() {
                let result = this.content;

                if (isXml(result)) {
                    result = xmlFormatter(result);
                }

                return result;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>