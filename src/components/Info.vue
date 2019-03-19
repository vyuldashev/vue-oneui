<template functional>
    <div>
        <div class="row no-gutters">
            <div class="col">
                <table :class="props.tableClass">
                    <thead>
                    <slot name="headers"/>
                    </thead>
                    <tbody>
                    <slot/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tableClass: {
                type: String,
                default: `table table-custom-info table-striped table-borderless remove-margin-b`,
            },
        },
    }
</script>

<style>
    .table-custom-info tr td:first-of-type {
        width: 20% !important;
        font-weight: bold;
    }

    .table-custom-info tr td {
        word-break: break-word;
    }
</style>
