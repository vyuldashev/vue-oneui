<template>
    <div class="block block-bordered block-link-hover3 text-center">
        <div class="block-content block-content-full bg-gray-lighter border-b">
            <div class="h1 font-w700">
                <slot name="head"/>
            </div>
            <div class="h5 text-muted text-uppercase push-5-t">
                <slot name="value"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>

</style>