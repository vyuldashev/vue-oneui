import Notify from 'notyf';

const notification = new Notify({
  delay: 5000
});

export default {
    success: message => notification.confirm(message),
    error: message => notification.alert(message)
}