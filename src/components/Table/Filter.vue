<template>
    <div>
        <v-block :title="blockTitle" @keyup.enter.native="submit">
            <template slot="options">
                <li v-if="settings.showSearchHelper">
                    <button type="button" ref="hint" @click="openSearchHelper">
                        <i class="si si-question"></i>
                    </button>
                </li>
            </template>
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

        <oneui-modal title="Расширенный поисковый запрос" :show="searchHelper.isOpen" @close="closeSearchHelper">
            <template slot="body">
                <h3 class="push-10">Операторы сравнения</h3>
                <p>Операторы сравнения допускают фильтрацию на основе результата сравнения атрибута модели и значения
                    запроса. Они работают для строк, цифр и дат. Они имеют следующий формат:</p>
                <pre>(&lt;Оператор&gt;) &lt;значение&gt;</pre>
                <p>Доступны следующие операторы сравнения:</p>
                <ul>
                    <li><code>gt</code> - для сравнения "больше, чем"</li>
                    <li><code>ge</code> - для сравнения "больше или равно, чем"</li>
                    <li><code>lt</code> - для сравнения "меньше, чем"</li>
                    <li><code>le</code> - для сравнения "меньше или равно, чем"</li>
                </ul>
                <p>Например, для получения данных больше 3, следует использовать следующий запрос:</p>
                <pre>(gt)3</pre>

                <h3 class="push-10">Оператор перечисления</h3>
                <p>Для поиска по нескольким значениям используется оператор <code>,</code>. Например:</p>
                <pre>1,2,3,4</pre>

                <h3 class="push-10">Оператор совпадений</h3>
                <p>Подобные операторы разрешают фильтрацию с использованием запроса LIKE. Этот оператор запускается,
                    если используется оператор точного совпадения, но значение содержит знак <code>%</code> в качестве
                    первого или последнего символа.</p>
                <p>Чтобы фильтровать данные, начинающиеся с 54, следует использовать следующий запрос:</p>
                <pre>54%</pre>

                <h3 class="push-10">Null оператор</h3>
                <p>Оператор <code>(null)</code> позволяет фильтровать модели с значением <code>null</code>.</p>
                <pre>(null)</pre>

                <h3 class="push-10">Оператор отрицания</h3>
                <p>Можно получить отрицательные результаты запроса, добавив оператора с помощью <code>!</code>.</p>
                <p>Получить все данные, которые не равны 7 и 8</p>
                <pre>!7,8</pre>
                <p>Получить все данные, которые не равны null</p>
                <pre>!(null)</pre>
            </template>
            <template slot="footer">
                <button type="button" class="btn btn-default" @click="closeSearchHelper">
                    Закрыть
                </button>
            </template>
        </oneui-modal>
    </div>
</template>

<script>
    import {settings} from '../../index';
    import forEach from 'lodash/forEach';

    import VBlock from '../Block';

    export default {
        components: {VBlock},
        props: {
            title: {
                type: String,
            },
            form: Object,
            loading: Boolean,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            initialForm: {},
            searchHelper: {
                isOpen: false
            },
            settings: settings.table,
        }),
        computed: {
            blockTitle() {
                return this.title ? this.title : this.$t('search');
            }
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

                this.$router.push({path: this.$route.path, query: query});

                this.$emit('onFilter', this.form);
            },
            reset() {
                forEach(this.form, (value, key) => {
                    if (this.initialForm.hasOwnProperty(key)) {
                        this.form[key] = this.initialForm[key];
                    }
                    else {
                        this.form[key] = '';
                    }
                });

                this.$router.push({path: this.$route.path});

                this.$nextTick(() => {
                    this.$emit('onFilterReset');
                });
            },
            openSearchHelper() {
                this.searchHelper.isOpen = true;
            },
            closeSearchHelper() {
                this.searchHelper.isOpen = false;
            }
        },
        mounted() {
            $(this.$refs.hint).popover({
                content: 'Для того, чтобы расширить результаты поиска, укажите % в поисковой строке перед и после поисковым запросом',
                trigger: 'hover',
                placement: 'left'
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
    }
</script>

<style scoped>
    p {
        margin-bottom: 1rem;
    }
</style>