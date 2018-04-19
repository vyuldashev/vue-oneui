<template functional>
    <div class="row items-push">
        <div class="col-xs-12">
            <table class="table table-info table-striped table-borderless remove-margin-b">
                <thead>
                <slot name="headers"/>
                </thead>
                <tbody>
                <slot/>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style>
    .table-info tr td:first-of-type {
        width: 20% !important;
        font-weight: bold;
    }

    .table-info tr td {
        word-break: break-word;
    }
</style>
