import moment from 'moment';

export default (value, time = false) => {
    if (value === null || value.length === 0) {
        return '';
    }

    const format = time ? 'DD.MM.YYYY H:mm:ss' : 'DD.MM.YYYY';

    return moment(value).format(format);
};
