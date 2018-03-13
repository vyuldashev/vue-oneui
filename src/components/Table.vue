<template>
    <div>
        <v-filter
                :form="filters"
                :loading="loading"
                @onFilter="onFilter"
                @onFilterReset="onFilterReset"
                :disabled="searchDisabled"
                v-if="filters">
            <slot name="filters"/>
        </v-filter>

        <v-block :title="blockTitle" :loading="loading" :allow-fullscreen="true">
            <template slot="options" slot-scope="props">
                <slot name="block-options"/>
                <export-csv v-if="options.exportCSV" :selector="`#${props.blockId} .table`" :filename="filename"/>
            </template>

            <template slot="content">
                <div class="row" v-if="paginationEnabled">
                    <div class="col-sm-6 text-right-xs">
                        <label>
                            Показать записей:
                            <select class="form-control input-sm" v-model="perPageModel" @change="reload">
                                <option v-for="item in perPageOptions" :value="item.value">
                                    {{ item.label }}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-right">
                            <pagination :data="pagination"
                                        @changePage="changePage"
                                        @initialized="paginationInitialized"
                            />
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <vuetable ref="vuetable"
                              @vuetable:loading="startedLoading"
                              @vuetable:loaded="stopLoading"
                              @vuetable:pagination-data="onPaginationData"
                              :css="css"
                              :api-mode="apiMode"
                              :api-url="url"
                              :data="data"
                              :fields="fields"
                              :append-params="appendParams"
                              :no-data-template="noDataTemplate"
                              :data-path="dataPath"
                              :pagination-path="paginationPath"
                              :http-fetch="httpFetch"
                              :per-page="perPageModel"/>
                </div>

                <slot name="table_append"/>
            </template>
        </v-block>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuetable from 'vuetable-2/src/components/Vuetable';
    import moment from 'moment';
    import transform from 'lodash/transform';
    import escape from 'lodash/escape';
    import each from 'lodash/each';

    import VBlock from './Block';
    import VFilter from './Table/Filter';
    import Pagination from './Table/Paginators/Factory';
    import typeDate from './mixins/type-date';
    import ExportCsv from './Table/ExportCSV';
    import resolveRouteTitle from '../utils/routeTitleResolver';

    export default {
        components: {Vuetable, VFilter, VBlock, Pagination, ExportCsv},
        props: {
            apiMode: {
                type: Boolean,
                default: true
            },
            data: {
                default: () => []
            },
            blockTitle: {
                type: String,
                default: ''
            },
            noDataTemplate: {
                type: String,
                default: 'Нет данных'
            },
            dataPath: {
                type: String,
                default: 'data'
            },
            paginationEnabled: {
                type: Boolean,
                default: true
            },
            paginationPath: {
                type: String,
                default: ''
            },
            url: String,
            columns: Array,
            filters: {
                type: Object,
                default: null
            },
            options: {
                type: Object,
                default() {
                    return {
                        exportCSV: true
                    };
                }
            },
            searchDisabled: {
                type: Boolean,
                default: false
            },
            perPage: {
                type: Number,
                default: 15
            },
            perPageOptions: {
                type: Array,
                default: () => [
                    {value: 15, label: '15'},
                    {value: 50, label: '50'},
                    {value: 100, label: '100'}
                ]
            }
        },
        data() {
            return {
                loading: false,
                css: {
                    tableClass: 'table table-striped table-borderless table-vcenter',
                },
                pagination: {},
                perPageModel: this.perPage  // Save perPage as prop
            }
        },
        computed: {
            blockId() {
                return 'table-block-' + this._uid;
            },
            fields() {
                transform(this.columns, (result, value, key) => {
                    // тип поля
                    if (value.hasOwnProperty('type')) {
                        switch (value.type) {
                            case 'date':
                                value.callback = (val) => typeDate(val);
                                break;
                            case 'datetime':
                                value.callback = (val) => typeDate(val, true);
                                break;
                            case 'money':
                                value.callback = (val) => Vue.filter('money')(val);
                                break;
                        }
                    }

                    if (!value.hasOwnProperty('callback')) {
                        // ограничение на 60 символов
                        value.callback = (val) => {
                            if (val && val.length > 60) {
                                val = escape(val);
                                return '<span data-toggle="tooltip" data-placement="top" data-original-title="' + val + '">' + val.substring(0, 60) + '...</span>';
                            }

                            return escape(val);
                        }
                    }

                    result[key] = value;
                }, []);

                return this.columns;
            },
            appendParams() {
                let params = {};

                each(this.filters, function (value, key) {
                    if (value.length > 0) {
                        params[`filters[${key}]`] = Array.isArray(value) ? value.join(',') : value;
                    }
                });

                return params;
            },
            filename() {
                const title = resolveRouteTitle(this.$route);

                return `${title !== null ? title : 'Отчет'} ${moment().format('YYYY-MM-DD')}.csv`;
            }
        },
        methods: {
            httpFetch(apiUrl, httpOptions) {
                console.log(apiUrl);
                return this.$http.get(apiUrl, httpOptions);
            },
            startedLoading() {
                this.loading = true;
            },
            stopLoading() {
                this.loading = false;
                this.$nextTick(() => {
                    $('[data-toggle="popover"]').popover({trigger: 'hover'});
                    $('[data-toggle="tooltip"]').tooltip()
                });
            },
            onPaginationData(data) {
                this.pagination = data;
            },
            paginationInitialized(parameters) {
                this.$refs.vuetable.tablePagination = parameters;
            },
            changePage(page) {
                this.$refs.vuetable.changePage(page);
            },
            setData(data) {
                this.$refs.vuetable.setData(data);
            },
            reload() {
                console.log('Table: reload');

                this.$nextTick(() => this.$refs.vuetable.refresh());
            },
            onFilter() {
                console.log('Table: onFilter', this.filters);

                this.reload();

                this.$emit('filter', this.filters);
            },
            onFilterReset() {
                console.log('Table: onFilterReset');

                this.reload();

                this.$emit('filterReset');
            }
        }
    }
</script>

<style scoped>
    select.form-control {
        width: 7rem;
        display: inline-block;
    }

    @media (max-width: 767px) {
        .text-right-xs {
            text-align: right;
        }
    }
</style>