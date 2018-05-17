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
                        <div class="col-md-7">
                            <label class="label" :style="{ color: instance.textColor }">
                                Владелец
                            </label>
                            <input v-model="value.cardHolder"
                                   v-tooltip.bottom="'Введите unembossed если карта неименная'"
                                   class="field"
                                   id="name"
                                   type="text"
                                   placeholder="CARDHOLDER"
                                   autocomplete="off">
                        </div>

                        <div class="col-md-5">
                            <label class="label" :style="{ color: instance.textColor }">
                                Срок действия
                            </label>

                            <oneui-form-select
                                    v-model="value.month"
                                    :items="monthOptions"
                                    class="field expired"
                            />

                            <oneui-form-select
                                    v-model="value.year"
                                    :items="yearOptions"
                                    class="field expired"
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
        }
    }
</script>

<style lang="scss" scoped>
    $cards-padding: 32px;
    $bank-logo-width: 320px;
    $bank-logo-height: 60px;

    #cards {
        width: 585px;
        height: 300px;
        position: relative;
        margin: 0 auto;

        #front, #back {
            position: absolute;
            width: 435px;
            height: 270px;
            border-radius: 0.5em;
        }

        #front {
            top: 0;
            left: 0;
            background: #ddd;
            z-index: 100;
        }

        #number {
            width: 100%;
            margin-bottom: 0.3em;
            color: #000000;
        }

        #front-fields {
            position: absolute;
            top: $bank-logo-height + 40;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: $cards-padding;
        }

        #bank-link {
            position: absolute;
            top: $cards-padding;
            right: $cards-padding;
            left: $cards-padding;
            width: $bank-logo-width;
            height: $bank-logo-height;
            display: block;
            background-size: contain;
            background-position: top left;
            background-repeat: no-repeat;
        }

        #brand-logo {
            position: absolute;
            top: 2.5em;
            //bottom: 1em;
            right: $cards-padding;
            text-align: right;
            height: 48px;
        }

        #back {
            bottom: 0;
            right: 0;
            background: #bbb;
            padding-top: 1em;
            padding-right: 1em;
            padding-left: 10.5em;
        }

        #code {
            width: 100px;
            float: right;
        }
        #code-label {
            text-align: right;
            font-size: 1.35em;
            white-space: normal;
        }

        .field {
            width: 100%;
            padding: 0.3em 0.5em;
            border: none;
            text-indent: 0.1em;
            color: #000000;
        }

        .expired {
            float: left;
            width: 4.5em;
            margin-right: 0.1em;
            padding: 0;
        }

        .label {
            display: block;
            margin-top: 0.5em;
            text-align: left;
            padding: 0;
            color: #000000;
            font-size: 100%;
        }
    }
</style>