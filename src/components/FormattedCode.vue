<template>
    <pre v-highlightjs="model" class="pre-sh"><code>{{ model }}</code></pre>
</template>

<script>
    import isXml from 'is-xml';
    import {pd as prettyData} from 'pretty-data';

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
                    result = prettyData.xml(result);
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