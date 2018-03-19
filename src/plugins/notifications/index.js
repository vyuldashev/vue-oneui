import Noty from 'noty';

export default {
    create(parameters) {
        parameters.theme = 'bootstrap-v3';
        parameters.layout = 'topRight';

        return new Noty(parameters);
    },
    alert(text) {
        this.create({type: 'alert', text: text}).show();
    },
    success(text) {
        this.create({type: 'success', text: text}).show();
    },
    warning(text) {
        this.create({type: 'warning', text: text}).show();
    },
    error(text) {
        this.create({type: 'error', text: text}).show();
    },
    info(text) {
        this.create({type: 'info', text: text}).show();
    }
}