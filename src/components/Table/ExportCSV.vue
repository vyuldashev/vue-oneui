<template>
    <span>
        <button class="btn-block-option" type="button" @click="generate" v-tooltip="$t('tooltip')">
            <i class="si si-doc"></i>
        </button>
        <a :href="url" :download="filename" class="hidden" ref="link"></a>
    </span>
</template>
<script>
    export default {
        props: {
            selector: {
                type: String,
                default: '.table'
            },
            filename: {
                type: String,
                default: 'report.csv'
            }
        },
        data() {
            return {
                url: null
            };
        },
        methods: {
            generate() {
                let csv = [];

                document.body.querySelectorAll(`${this.selector} thead tr, ${this.selector} tbody tr`).forEach(node => {
                    let rows = [];

                    node.querySelectorAll('td, th').forEach(col => {
                        rows.push(`"${col.innerText.trim().replace(new RegExp('"', 'g'), '""')}"`);
                    });

                    csv.push(rows.join(';'));
                });

                this.url = URL.createObjectURL(new Blob(["\ufeff", csv.join("\n")], {type: 'text/csv'}));

                this.$nextTick(() => {
                    this.$refs.link.click();
                });
            }
        },
        i18n: {
            messages: {
                en: {
                    tooltip: 'Export as csv',
                },
                ru: {
                    tooltip: 'Сохранить как .сsv',
                },
            },
        }
    }
</script>
