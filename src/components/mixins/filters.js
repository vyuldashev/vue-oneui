import Vue from 'vue';
import Vuei18n from 'vue-i18n';
import moment from 'moment-timezone';
import typeDate from './type-date';
import accounting from 'accounting';
import {settings} from '../../index.js';

export const i18n = new Vuei18n({
    locale: () => settings.language,
    fallbackLocale: 'en',
    messages: {
        en: {
            optional: 'No data',
        },
        ru: {
            optional: 'Нет данных',
        },
    }
});

Vue.filter('datetime', (value, fromTz = 'UTC') => {
    return typeDate(value, true, fromTz);
});

Vue.filter('moment-from-now', (value, fromTz = 'UTC') => {
    return moment.tz(value, fromTz).tz(settings.timezone).fromNow();
});

Vue.filter('date', (value, fromTz = 'UTC') => {
    return typeDate(value, false, fromTz);
});

Vue.filter('check', (value) => {
    return value ? '<i class="si si-check text-success">' : '<i class="si si-close text-danger"></i>';
});

Vue.filter('money', (value, precision = 2, currency = '') => {
    return accounting.formatMoney(value, currency, precision, ' ', '.');
});

Vue.filter('optional', (value, replace = i18n.t('optional')) => {
    return !value || value.length === 0 ? replace : value;
});