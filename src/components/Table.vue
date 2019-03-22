<template>
    <div>
        <v-filter
                :form="filters"
                :loading="isLoading"
                @onFilter="onFilter"
                @onFilterReset="onFilterReset"
                :disabled="searchDisabled"
                v-if="$scopedSlots.filters && filtersResolved && Object.keys(filters).length > 0">
            <slot name="filters" :errors="errors"/>
        </v-filter>

        <v-block :title="blockTitle" :loading="isLoading" :allow-fullscreen="true" :has-errors="hasErrors">
            <template slot="options" slot-scope="props">
                <slot name="block-options"/>
                <export-csv v-if="options.exportCSV" :selector="`#${props.blockId} .table`" :filename="filename"/>
            </template>

            <template slot="content">
                <div class="row" v-if="paginationEnabled">
                    <div class="col-sm-6 text-right-xs">
                        <label>
                            {{ $t('pagination_per_page') }}:
                            <select class="form-control input-sm" v-model="perPageModel" @change="handlePerPageChanged">
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
                              @vuetable:load-error="handleLoadError"
                              :css="css"
                              :api-mode="apiMode"
                              :api-url="url"
                              :data="data"
                              :fields="fields"
                              :append-params="appendParams"
                              :no-data-template="$t('no_data')"
                              :data-path="dataPath"
                              :pagination-path="paginationPath"
                              :http-fetch="httpFetch"
                              :per-page="perPageModel"
                              :row-class="rowClass"
                    />
                </div>

                <div class="row" v-if="paginationEnabled">
                    <div class="col-sm-6 col-sm-push-6">
                        <div class="text-right">
                            <pagination :data="pagination"
                                        @changePage="changePage"
                                        @initialized="paginationInitialized"
                            />
                        </div>
                    </div>
                </div>

                <slot name="table_append"/>
            </template>
        </v-block>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuetable from 'vuetable-2/src/components/Vuetable';
    import moment from 'moment-timezone';
    import get from 'lodash/get';
    import escape from 'lodash/escape';
    import each from 'lodash/each';
    import isPlainObject from 'lodash/isPlainObject';

    import VBlock from './Block';
    import VFilter from './Table/Filter';
    import Pagination from './Table/Paginators/Factory';
    import typeDate from './mixins/type-date';
    import ExportCsv from './Table/ExportCSV';
    import resolveRouteTitle from '../utils/routeTitleResolver';
    import { Errors } from 'form-backend-validation';

    export default {
        components: { Vuetable, VFilter, VBlock, Pagination, ExportCsv },
        props: {
            apiMode: {
                type: Boolean,
                default: true,
            },
            data: {
                default: () => [],
            },
            blockTitle: {
                type: String,
                default: '',
            },
            noDataTemplate: {
                type: String,
            },
            dataPath: {
                type: String,
                default: 'data',
            },
            paginationEnabled: {
                type: Boolean,
                default: true,
            },
            paginationPath: {
                type: String,
                default: '',
            },
            url: String,
            columns: Array,
            filters: {
                type: Object,
                default: () => ({}),
            },
            options: {
                type: Object,
                default() {
                    return {
                        exportCSV: true,
                    };
                },
            },
            searchDisabled: {
                type: Boolean,
                default: false,
            },
            perPage: {
                type: Number,
                default: 15,
            },
            perPageOptions: {
                type: Array,
                default: () => [
                    { value: 15, label: '15' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                ],
            },
            filterQueryParameter: {
                type: String,
                default: 'filters',
            },
            rowClass: {
                type: [String, Function],
                default: '',
            },
            hasErrors: Boolean,
            rowCharactersLimit: {
                type: Number,
                default: 60,
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                state: {
                    loading: false,
                },
                css: {
                    tableClass: 'table table-striped table-borderless table-vcenter',
                    ascendingIcon: 'fa fa-fw fa-sort-asc',
                    descendingIcon: 'fa fa-fw fa-sort-desc',
                    ascendingClass: 'sorted-asc',
                    descendingClass: 'sorted-desc',
                    sortableIcon: '',
                },
                pagination: {},
                perPageModel: this.perPage,
                originalFilters: {},
                filtersModel: {},
                filtersResolved: false,
                errors: new Errors(),
            };
        },
        computed: {
            blockId() {
                return 'table-block-' + this._uid;
            },
            fields() {
                this.columns.forEach(column => {
                    if (column.type) {
                        if (typeof column.type === 'string') {
                            switch (column.type) {
                                case 'date':
                                    column.callback = value => typeDate(value);
                                    break;
                                case 'datetime':
                                    column.callback = value => typeDate(value, true);
                                    break;
                                case 'money':
                                    column.callback = value => Vue.filter('money')(value);
                                    break;
                            }
                        }

                        if (isPlainObject(column.type)) {
                            column.callback = value => Vue.filter(column.type.name)(value, ...column.type.args);
                        }
                    }

                    if (!column.callback) {
                        column.callback = value => {
                            if (value && this.rowCharactersLimit > 0 && value.length > this.rowCharactersLimit) {
                                value = escape(value);
                                return '<span data-toggle="tooltip" data-placement="top" data-original-title="' + value + '">' + value.substring(0, this.rowCharactersLimit) + '...</span>';
                            }

                            return escape(value);
                        };
                    }
                });

                this.$nextTick(() => {
                    this.$refs.vuetable.normalizeFields();
                });

                return this.columns;
            },
            appendParams() {
                let params = {};

                each(this.filtersModel, (value, key) => {
                    if (value.length > 0) {
                        params[`${this.filterQueryParameter}[${key}]`] = Array.isArray(value) ? value.join(',') : value;
                    }
                });

                return params;
            },
            filename() {
                const title = resolveRouteTitle(this.$route);

                return `${title !== null ? title : 'Отчет'} ${moment().format('YYYY-MM-DD')}.csv`;
            },
            isLoading() {
                return this.state.loading || this.loading;
            },
        },
        beforeMount() {
            Object.assign(this.originalFilters, this.filters);
            this.resolveFilters();
        },
        methods: {
            httpFetch(apiUrl, httpOptions) {
                return this.$http.get(apiUrl, httpOptions);
            },
            startedLoading() {
                this.state.loading = true;
            },
            stopLoading() {
                this.state.loading = false;
                this.$nextTick(() => {
                    $('[data-toggle="popover"]').popover({ trigger: 'hover' });
                    $('[data-toggle="tooltip"]').tooltip();
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
                this.$nextTick(() => {
                    this.$refs.vuetable.refresh();
                });
            },
            resolveFilters() {
                const query = this.$route.query;
                let model = this.filters;
                let filled = [];

                if (Object.keys(query).length > 0) {
                    Object.keys(query).map(key => {
                        const rawKey = key.replace(this.filterQueryParameter, '').replace('[', '').replace(']', '');

                        model[rawKey] = query[key];
                        filled.push(rawKey);
                    });
                }

                Object.keys(this.filters)
                    .filter(key => filled.indexOf(key) === -1)
                    .map(key => {
                        model[key] = this.originalFilters[key];
                    });

                this.filtersModel = model;

                this.$nextTick(() => {
                    Object.assign(this.filters, model);
                    this.filtersResolved = true;
                });
            },
            onFilter(val) {
                this.filtersModel = val;
                this.errors.clear(null);

                this.reload();

                this.$emit('filter', this.filtersModel);
            },
            onFilterReset(val) {
                this.filtersModel = val;
                this.errors.clear(null);

                this.reload();

                this.$emit('filterReset');
            },
            handlePerPageChanged() {
                this.reload();
                this.$emit('perPageChanged', this.perPageModel);
            },
            handleLoadError(response) {
                // Validation error
                const status = get(response, 'response.status');

                if (status === 422) {
                    this.errors.record(get(response, 'response.data.errors', {}));
                }

                this.$emit('loadError', response);
            },
        },
        mounted() {
            $('.table-responsive').on('shown.bs.dropdown', function (e) {
                var t = $(this),
                    m = $(e.target).find('.dropdown-menu'),
                    tb = t.offset().top + t.height(),
                    mb = m.offset().top + m.outerHeight(true),
                    d = 20; // Space for shadow + scrollbar.
                if (t[0].scrollWidth > t.innerWidth()) {
                    if (mb + d > tb) {
                        t.css('padding-bottom', ((mb + d) - tb));
                    }
                } else {
                    t.css('overflow', 'visible');
                }
            }).on('hidden.bs.dropdown', function () {
                $(this).css({ 'padding-bottom': '', 'overflow': '' });
            });
        },
        i18n: {
            messages: {
                en: {
                    no_data: 'No data available',
                    pagination_per_page: 'Records per page',
                },
                ru: {
                    no_data: 'Нет данных',
                    pagination_per_page: 'Показать записей',
                },
            },
        },
    };
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
