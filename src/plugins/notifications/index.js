import Noty from 'noty';

export default {
    create(text, type = 'info') {
        return new Noty({
            theme: 'bootstrap-v3',
            layout: 'topRight',
            timeout: 5000,
            force: true,
            text,
            type,
            animation: {
                open: 'animated bounceInRight', // Animate.css class names
                close: 'animated bounceOutRight' // Animate.css class names
            }
        });
    },
    alert(text) {
        this.create(text, 'alert').show();
    },
    success(text) {
        this.create(text, 'success').show();
    },
    warning(text) {
        this.create(text, 'warning').show();
    },
    error(text) {
        this.create(text, 'error').show();
    },
    info(text) {
        this.create(text, 'info').show();
    }
}