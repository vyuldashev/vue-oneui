import moment from 'moment-timezone';
import {settings} from '../../index';

export default (value, time = false, fromTz = 'UTC') => {
    if (value === null || value.length === 0) {
        return '';
    }

    const format = time ? 'DD.MM.YYYY H:mm:ss' : 'DD.MM.YYYY';

    return moment.tz(value, fromTz).tz(settings.timezone).format(format);
};
