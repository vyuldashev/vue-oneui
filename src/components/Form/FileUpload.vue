<template>
    <div class="form-group" :class="{'has-error': hasErrors}">
        <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :accept="accept"
                :file-list="fileList"
                :auto-upload="false"
                :multiple="false"
                :on-change="onChange">
            <el-button slot="trigger" size="small" type="primary">{{ label }}</el-button>
        </el-upload>

        <div class="help-block" v-if="hasErrors">{{ error }}</div>
    </div>

</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: 'file'
            },
            accept: {
                type: String,
                default: '*'
            },
            label: {
                type: String,
                default: 'Выберите файл',
            },
            value: {
                default: null
            },
            hasErrors: Boolean,
            error: String
        },
        data() {
            return {
                fileList: [],
            }
        },
        watch: {
            value(val) {
                if (val === '') {
                    this.fileList = [];
                }
            },
        },
        methods: {
            onChange(files, fileList) {
                this.fileList = fileList.slice(-1);

                this.$emit('input', this.fileList[0].raw);
            },
        }
    }
</script>

<style>
    .el-upload__input {
        display: none !important;
    }
</style>