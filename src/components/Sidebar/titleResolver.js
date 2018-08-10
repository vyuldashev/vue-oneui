import {settings} from '../../index';

export default (title) => {
    if(typeof title === 'object') {
        return title[settings.language];
    }

    return title;
};