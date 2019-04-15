<template>
    <div>
        <v-block :title="blockTitle" @keyup.enter.native="submit">
            <template slot="content">
                <slot/>
            </template>
            <div slot="footer" class="text-right">
                <button class="btn btn-default" @click="submit" :disabled="loading || disabled">
                        <span v-if="!loading">
                            <i class="si si-magnifier"/>
                            {{ $t('search') }}
                        </span>
                    <span v-else><i class="fa fa-cog fa-spin"/></span>
                </button>

                <button class="btn btn-default" @click="reset" v-if="!loading" v-tooltip="$t('reset')">
                    <span><i class="si si-reload"/></span>
                </button>
            </div>
        </v-block>

    </div>
</template>

<script>
    import { settings } from '../../index';
    import forEach from 'lodash/forEach';

    import VBlock from '../Block';

    export default {
        components: { VBlock },
        props: {
            title: {
                type: String,
            },
            form: Object,
            loading: Boolean,
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            initialForm: {},
            settings: settings.table,
        }),
        computed: {
            blockTitle() {
                return this.title ? this.title : this.$t('search');
            },
        },
        created() {
            Object.assign(this.initialForm, this.form);
        },
        methods: {
            submit() {
                let query = {};

                Object.keys(this.form).map(key => {
                    if (this.form[key].length > 0) {
                        query[`filters[${key}]`] = this.form[key];
                    }
                });

                this.$router.push({ path: this.$route.path, query: query });

                this.$emit('onFilter', this.form);
            },
            reset() {
                forEach(this.form, (value, key) => {
                    if (this.initialForm.hasOwnProperty(key)) {
                        this.form[key] = this.initialForm[key];
                    } else {
                        this.form[key] = '';
                    }
                });

                this.$router.push({ path: this.$route.path });

                this.$emit('onFilterReset');
            },
        },
        mounted() {
            $(this.$refs.hint).popover({
                content: 'Для того, чтобы расширить результаты поиска, укажите % в поисковой строке перед и после поисковым запросом',
                trigger: 'hover',
                placement: 'left',
            });
        },
        i18n: {
            messages: {
                en: {
                    search: 'Search',
                    reset: 'Reset',
                },
                ru: {
                    search: 'Поиск',
                    reset: 'Сбросить фильтры',
                },
            },
        },
    };
</script>

<style scoped>
    p {
        margin-bottom: 1rem;
    }
</style>
