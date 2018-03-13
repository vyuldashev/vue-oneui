<template>
    <div class="wrapper">
        <form enctype="multipart/form-data" novalidate>
            <label v-if="label">{{ label }}</label>

            <input type="file"
                   ref="file-input"
                   :name="name"
                   :accept="accept"
                   @change="filesChange($event.target.name, $event.target.files)"
            />
        </form>
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
                default: null
            },
            value: {
                default: null
            }
        },
        watch: {
            value(val) {
                if (val === '') {
                    this.$refs['file-input'].value = '';
                }
            }
        },
        methods: {
            filesChange(fieldName, fileList) {
                if (!fileList.length) {
                    return;
                }

                this.$emit('input', fileList[0]);
            }
        }
    }
</script>

<style scoped>

</style>
