<script setup lang="ts">
    import { computed } from 'vue';
    import { useVModel } from '@vueuse/core'

    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        }
    })

    const emit = defineEmits(['update:modelValue'])
    const textInput = useVModel(props, 'modelValue', emit)
</script>

<template>
    <label :for="name" class="error">
        <p><slot>MISSING LABEL</slot></p>
        <textarea :type="type" :name="name" id="" :placeholder="placeholder" v-model.lazy="textInput" :required="isRequired"/>
    </label>
</template>

<style scoped lang="scss">
    label {
        @include flex-col;
        gap: 0;
        color: $clr-secondary;
        width: 100%;

        p {
            margin: 0;
            padding-bottom: .25em;

            span {
                padding-left: .1em;
            }
        }

        textarea {
            border-radius: 10px;
            min-height: 7.5em;
            border: 3px solid $clr-secondary;
            background: none;
            padding-block: .5em;
            padding-inline: .25em;

            &:focus {
                outline: none;
                // border: 4px solid $clr-secondary;
            }
        }
    }
</style>