<template>
    <li>
        <button type="button" @click="generate" v-tooltip="'Сохранить как .сsv'">
            <i class="si si-doc"></i>
        </button>
        <a :href="url" :download="filename" class="hidden" ref="link"></a>
    </li>
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
        }
    }
</script>