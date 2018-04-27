import Vue from 'vue';
import moment from 'moment-timezone';
import typeDate from './type-date';
import accounting from 'accounting';
import {settings} from '../../index';

Vue.filter('datetime', (value, fromTz = 'UTC') => {
    console.log(value, fromTz);
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