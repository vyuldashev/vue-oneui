import Vue from 'vue';
import Sidebar from './components/Sidebar';
import Block from './components/Block';
import Info from './components/Info';
import Modal from './components/Modal';
import Alert from './components/Alert';
import Table from './components/Table';
import ActivityLog from './components/ActivityLog';
import ActivityGatewayLog from './components/ActivityGatewayLog';

import FormPromiseButton from './components/Form/PromiseButton';
import FormButton from './components/Form/Button';
import FormCheckbox from './components/Form/Checkbox';
import FormRadio from './components/Form/Radio';
import FormInput from './components/Form/Input';
import FormInputStatic from './components/Form/InputStatic';
import FormTextarea from './components/Form/Textarea';
import FormSelect from './components/Form/Select';
import FormSelect2 from './components/Form/Select2';
import FormSwitchButton from './components/Form/SwitchButton';
import FormDateInput from './components/Form/DateInput';
import FormDateTimeInput from './components/Form/DateTimeInput';
import FormFileUpload from './components/Form/FileUpload';
import FormMultiSelect from 'vue-multiselect'; // TODO обернуть в компонент кастомный
import TableFilter from './components/Table/Filter';
import TablePagination from './components/Table/Paginators/Factory';
import {Tab, TabList} from './components/TabList';

import TileText from './components/Tiles/Text';

import IconActivity from './components/Icons/Activity';
import IconArrow from './components/Icons/Arrow';
import IconSize from './components/Icons/Size';

import Clipboard from 'v-clipboard';
import VTooltip from 'v-tooltip';
import VueMorphling from 'vue-morphling';
import VueHighlightJS from 'vue-highlightjs'

Vue.use(Clipboard);
Vue.use(VTooltip);
Vue.use(VueMorphling);
Vue.use(VueHighlightJS);

const components = {
    Sidebar,
    Block,
    Info,
    Modal,
    Alert,
    Table,
    ActivityLog,
    ActivityGatewayLog,

    FormPromiseButton,
    FormButton,
    FormCheckbox,
    FormRadio,
    FormInput,
    FormInputStatic,
    FormTextarea,
    FormSelect,
    FormSelect2,
    FormSwitchButton,
    FormDateInput,
    FormDateTimeInput,
    FormMultiSelect,
    FormFileUpload,

    TableFilter,
    TablePagination,

    TabList,
    Tab,

    TileText,

    IconActivity,
    IconArrow,
    IconSize,

};

function plugin(Vue, opts = {prefix: 'oneui'}) {
    const {prefix} = opts;
    const compNames = Object.keys(components);
    for (let i = 0; i < compNames.length; i++) {
        const name = compNames[i];
        Vue.component(`${prefix}${name}`, components[name]);
    }
}

require('./components/mixins/filters');

export default plugin;
