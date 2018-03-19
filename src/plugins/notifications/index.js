import Noty from 'noty';

export default {
    create(parameters) {
        parameters.theme = 'bootstrap-v3';
        parameters.layout = 'topRight';
        parameters.timeout = 5000;
        parameters.animation = {
            open: 'animated bounceInRight', // Animate.css class names
            close: 'animated bounceOutRight' // Animate.css class names
        };

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