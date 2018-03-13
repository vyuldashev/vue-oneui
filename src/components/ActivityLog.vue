<template>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" v-if="items.length > 0">
        <div class="panel panel-default" v-for="(item, index) in items">
            <div class="panel-heading" role="tab" :id="tabHeadingId(item)">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse"
                       data-parent="#accordion"
                       :href="tabCollapse(item)"
                       aria-expanded="true"
                       :aria-controls="tabCollapseId(item)">
                        {{ resolveHeading(item) }}
                    </a>
                </h4>
            </div>
            <div :id="tabCollapseId(item)" class="panel-collapse collapse"
                 :class="{ 'in': index === 0}"
                 role="tabpanel"
                 :aria-labelledby="tabHeading(item)">
                <div class="panel-body">
                    <slot name="item" :item="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            heading: {
                type: [String, Function]
            },
            items: {
                required: true,
                default: () => []
            },
        },
        updated() {
            this.$nextTick(() => {
                $('pre code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            });
        },
        methods: {
            tabHeadingId(item) {
                return `heading-${item.id}`;
            },
            tabHeading(item) {
                return `#heading-${item.id}`;
            },
            tabCollapseId(item) {
                return `collapse-${item.id}`;
            },
            tabCollapse(item) {
                return `#collapse-${item.id}`;
            },
            resolveHeading(item) {
                if (this.heading === null) {
                    return item;
                }

                if (typeof this.heading === 'function') {
                    return this.heading(item);
                }

                return item[this.heading];
            }
        }
    }
</script>

<style scoped>

</style>