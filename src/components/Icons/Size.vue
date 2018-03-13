<template functional>
    <i :class="{si: true, 'si-size-fullscreen': !props.increased, 'si-size-actual': props.increased}"/>
</template>

<script>
    export default {
        props: {
            increased: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>