<template>
    <form autocomplete="off">
        <!-- For disabling autocomplete -->
        <input type="text" name="number" style="display:none">
        <input type="text" name="name" style="display:none">
        <input type="text" name="mm" style="display:none">
        <input type="text" name="yy" style="display:none">
        <input type="password" name="code" style="display:none">

        <div id="cards" class="hidden-xs hidden-sm" v-if="instance">
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

        <div class="visible-xs visible-sm" v-if="instance">
            <div class="form-group">
                <label>{{ $t('number') }}</label>

                <input :value="value.number"
                       @input="numberChanged($event.target.value)"
                       class="form-control"
                       id="number"
                       type="text"
                       placeholder="0000 0000 0000 0000"
                       maxlength="22"
                       autocomplete="off"
                >
            </div>
            <div class="form-group">
                <label>{{ $t('cardholder') }}</label>

                <input v-model="value.cardHolder"
                       class="form-control"
                       type="text"
                       placeholder="CARDHOLDER"
                       autocomplete="off">
            </div>

            <oneui-form-select
                    :label="$t('expiration_month')"
                    v-model="value.month"
                    :items="monthOptions"
                    class="field expired"
            />

            <oneui-form-select
                    :label="$t('expiration_year')"
                    v-model="value.year"
                    :items="yearOptions"
                    class="field expired year"
            />

            <div class="form-group">
                <label>{{ instance.codeName ? instance.codeName : $t('code') }}</label>

                <input v-model="value.cvv"
                       class="form-control"
                       placeholder=""
                       maxlength="4"
                       autocomplete="off">
            </div>
        </div>
    </form>
</template>

<script>
    import CardInfo from 'card-info';

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
                return Array.from({length: 12}).map((_, i) => ({
                    value: i + 1,
                    title: i + 1
                }));
            },
            yearOptions() {
                const year = moment().year();

                return Array.from({length: 19}).map((_, i) => ({
                    value: year + i,
                    title: year + i,
                }));
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
                    number: 'Card number',
                    cardholder: 'Cardholder',
                    cardholder_tooltip: 'Type unembossed if your card is unnamed',
                    expiration: 'Expiration',
                    expiration_month: 'Expiration (month)',
                    expiration_year: 'Expiration (year)',
                    code: 'Code',
                },
                ru: {
                    number: 'Номер карты',
                    cardholder: 'Владелец',
                    cardholder_tooltip: 'Введите unembossed если карта неименная',
                    expiration: 'Срок действия',
                    expiration_month: 'Срок действия (месяц)',
                    expiration_year: 'Срок действия (год)',
                    code: 'Код',
                },
            }
        },
    }
</script>
