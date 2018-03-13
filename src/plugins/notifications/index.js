export default {
    success(message, delay = 5000) {
        $.notify({message}, {
            // settings
            type: 'success',
            allow_dismiss: true,
            newest_on_top: true,
            delay,
            placement: {
                from: 'top',
                align: 'right'
            },
        });
    },
    error(message, delay = 5000) {
        $.notify({message}, {
            // settings
            type: 'danger',
            allow_dismiss: true,
            newest_on_top: true,
            delay,
            placement: {
                from: 'top',
                align: 'right'
            },
        });
    }
}