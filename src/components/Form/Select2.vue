<template>
    <div class="form-group" :class="{ 'has-error': hasErrors }">
        <label :for="inputId" v-if="label">{{ label }}</label>
        <select ref="select" class="form-control" :id="inputId" :multiple="multiple" :disabled="disabled">
            <option value="" v-if="!multiple">&nbsp;</option>
            <option v-for="item in items" :value="resolvedValue(item)" :selected="isSelected(item)">
                {{ resolvedTitle(item) }}
            </option>
        </select>
        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>
</template>

<script>
    import Qs from 'qs';

    export default {
        props: {
            value: {
                type: [Array, String, Number],
                default: null
            },
            label: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                default: null
            },
            items: {
                type: Array,
                default: () => ([])
            },
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: Boolean,
            hasErrors: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
                default: null
            },
            display: {
                type: [String, Function],
                default: null
            },
            assign: {
                type: [String, Function],
                default: null
            },
            url: {
                type: String,
                default: null
            },
            setFilters: {
                type: Function,
                default: null
            },
            delay: {
                type: Number,
                default: 250
            },
            hasMore: {
                type: Function,
                default: ({links}) => links.next !== null
            },
            tags: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            inputId() {
                return this.id !== null ? `select-${this.id}` : `select-${this._uid}`;
            },
            ajax() {
                if (this.url === null) return;

                return {
                    delay: this.delay,
                    processResults: response => {
                        const items = Array.isArray(response) ? response : response.data;

                        return {
                            results: items.map(el => ({id: this.resolvedValue(el), text: this.resolvedTitle(el)})),
                            pagination: {
                                more: this.hasMore(response)
                            }
                        };
                    },
                    transport: ({data: {term, page = 1}}, success, failure) => {
                        return this.$http.get(this.url, {
                            params: {
                                filters: this.setFilters(term),
                                page
                            },
                            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'brackets', skipNulls: true})
                        })
                            .then(response => success(response.data))
                            .catch(() => failure());
                    }
                };
            },
            defaultValue() {
                return this.multiple ? [] : '';
            }
        },
        watch: {
            value(val) {
                $(this.$refs.select).val(val).trigger('change.select2');
            }
        },
        methods: {
            resolvedValue(item) {
                if (this.assign === null) {
                    return item;
                }

                if (typeof this.assign === 'function') {
                    return this.assign(item);
                }

                return item[this.assign];
            },
            isSelected(item) {
                const value = this.resolvedValue(item);

                if (Array.isArray(this.value)) {
                    return this.value.indexOf(value) !== -1;
                }

                return this.value === value;
            },
            resolvedTitle(item) {
                if (this.display === null) {
                    return item;
                }

                if (typeof this.display === 'function') {
                    return this.display(item);
                }

                return item[this.display];
            }
        },
        mounted() {
            $(this.$refs.select)
                .select2({
                    width: '100%',
                    ajax: this.ajax,
                    tags: this.tags,
                })
                .on('select2:select select2:unselect', event => {
                    this.$emit('input', $(event.target).val() || this.defaultValue);
                });
        },
        updated() {
            $(this.$refs.select).val(this.value).trigger('change.select2');
        },
        beforeDestroy() {
            $(this.$refs.select)
                .select2('destroy')
                .off('select2:select select2:unselect');
        }
    }
</script>