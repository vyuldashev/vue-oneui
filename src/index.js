import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import Sidebar from './components/Sidebar';
import Block from './components/Block';
import BlockActions from './components/Block/Actions';
import Info from './components/Info';
import Modal from './components/Modal';
import Alert from './components/Alert';
import Table from './components/Table';
import ActivityLog from './components/ActivityLog';
import ActivityGatewayLog from './components/ActivityGatewayLog';
import FormattedCode from './components/FormattedCode';

import FormPromiseButton from './components/Form/PromiseButton';
import FormButton from './components/Form/Button';
import FormCard from './components/Form/Card';
import FormCheckbox from './components/Form/Checkbox';
import FormRadio from './components/Form/Radio';
import FormInput from './components/Form/Input';
import FormInputStatic from './components/Form/InputStatic';
import FormTextarea from './components/Form/Textarea';
import FormTextEditor from './components/Form/TextEditor';
import FormSelect from './components/Form/Select';
import FormSelect2 from './components/Form/Select2';
import FormSwitchButton from './components/Form/SwitchButton';
import FormDateInput from './components/Form/DateInput';
import FormDateTimeInput from './components/Form/DateTimeInput';
import FormFileUpload from './components/Form/FileUpload';
import FormGroup from './components/Form/Group';
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
import VueHighlightJS from './plugins/vue-highlightjs';

Vue.use(ElementUI);
Vue.use(Clipboard);
Vue.use(VTooltip);
Vue.use(VueMorphling);
Vue.use(VueHighlightJS);
Vue.use(VueI18n);

const components = {
    Sidebar,
    Block,
    BlockActions,
    Info,
    Modal,
    Alert,
    Table,
    ActivityLog,
    ActivityGatewayLog,
    FormattedCode,

    FormPromiseButton,
    FormButton,
    FormCard,
    FormCheckbox,
    FormRadio,
    FormInput,
    FormInputStatic,
    FormTextarea,
    FormTextEditor,
    FormSelect,
    FormSelect2,
    FormSwitchButton,
    FormDateInput,
    FormDateTimeInput,
    FormMultiSelect,
    FormFileUpload,
    FormGroup,

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

export const settings = {
    timezone: 'UTC',
    language: 'en',
    table: {
        showSearchHelper: true,
    }
};