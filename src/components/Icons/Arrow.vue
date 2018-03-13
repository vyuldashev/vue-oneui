<template functional>
    <i :class="['si', `si-arrow-${props.direction}`]"/>
</template>

<script>
    export default {
        props: {
            direction: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>