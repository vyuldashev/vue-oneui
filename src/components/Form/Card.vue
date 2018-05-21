<template>
    <form autocomplete="off">
        <!-- For disabling autocomplete -->
        <input type="text" name="number" style="display:none">
        <input type="text" name="name" style="display:none">
        <input type="text" name="mm" style="display:none">
        <input type="text" name="yy" style="display:none">
        <input type="password" name="code" style="display:none">

        <div id="cards" class="hidden-xs" v-if="instance">
            <div id="front" :style="{ background: instance.backgroundGradient, color: instance.textColor }">
                <a target="_blank" :href="instance.bankUrl" id="bank-link"
                   :style="{ backgroundImage: 'url('+instance.bankLogo+')' }"></a>
                <img v-if="instance.brandLogo" :src="instance.brandLogo" :alt="instance.brandName" id="brand-logo">
                <div id="front-fields">
                    <input class="field"
                           :value="numberFormatted"
                           @input="numberChanged($event.target.value)"
                           id="number"
                           type="text"
                           placeholder="0000 0000 0000 0000"
                           maxlength="22"
                           autocomplete="off"
                    >

                    <div class="row">
                        <div class="col-md-6">
                            <label class="label" :style="{ color: instance.textColor }">
                                {{ $t('cardholder') }}
                            </label>
                            <input v-model="value.cardHolder"
                                   v-tooltip.bottom="$t('cardholder_tooltip')"
                                   class="field"
                                   id="name"
                                   type="text"
                                   placeholder="CARDHOLDER"
                                   autocomplete="off">
                        </div>

                        <div class="col-md-6">
                            <label class="label" :style="{ color: instance.textColor }">
                                {{ $t('expiration') }}
                            </label>

                            <oneui-form-select
                                    v-model="value.month"
                                    :items="monthOptions"
                                    class="field expired"
                            />

                            <oneui-form-select
                                    v-model="value.year"
                                    :items="yearOptions"
                                    class="field expired year"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="back">
                <label id="code-label" class="label">{{ instance.codeName }}</label>

                <input v-model="value.cvv"
                       class="field push-10-t"
                       id="code"
                       type="password"
                       placeholder=""
                       maxlength="4"
                       autocomplete="off">
            </div>
        </div>
    </form>
</template>

<script>
    import CardInfo from 'card-info';
    import range from 'lodash/range';

    export default {
        props: {
            value: {
                type: Object,
                default: () => {
                    return {
                        number: '',
                        cardHolder: '',
                        month: moment().month(),
                        year: moment().year(),
                        cvv: '',
                    }
                }
            },
        },
        data() {
            return {
                instance: null,
            }
        },
        computed: {
            numberFormatted: function () {
                if (!this.value || !this.value.number) {
                    return '';
                }

                let result = this.value.number.replace(/\s/g, '');

                this.instance = new CardInfo(result);

                return result.replace(/(.{4})/g, '$1 ');
            },
            monthOptions() {
                return Object.values(range(1, 12)).map(item => {
                    return {
                        value: item,
                        title: item,
                    };
                });
            },
            yearOptions() {
                const max = moment().year() + 19;

                return Object.values(range(moment().year(), max)).map(item => {
                    return {
                        value: item,
                        title: item,
                    }
                });
            },
        },
        mounted() {
            CardInfo.setDefaultOptions({
                banksLogosPath: '/images/banks-logos/',
                brandsLogosPath: '/images/brands-logos/'
            });

            this.instance = new CardInfo(this.number);
        },
        methods: {
            numberChanged(value) {
                this.value.number = value.replace(/\s/g, '');
            }
        },
        i18n: {
            messages: {
                en: {
                    cardholder: 'Cardholder',
                    cardholder_tooltip: 'Type unembossed if your card is unnamed',
                    expiration: 'Expiration',
                },
                ru: {
                    cardholder: 'Владелец',
                    cardholder_tooltip: 'Введите unembossed если карта неименная',
                    expiration: 'Срок действия',
                },
            }
        },
    }
</script>
