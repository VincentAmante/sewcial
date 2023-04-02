<script setup lang="ts">
    import { computed } from 'vue';
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
            default: true
        },
        type: {
            type: String,
            default: 'text'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:modelValue'])
    const textInput = computed({
        get(){
            return props.modelValue
        },
        set(value){
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <label :for="name" class="error">
        <p>
            <span><slot>MISSING LABEL</slot></span>
            <span v-if="isRequired">*</span></p>
        <input 
        :type="type" 
        :name="name" 
        id="" 
        :placeholder="placeholder" 
        v-model.lazy="textInput" 
        :required="isRequired"
        :disabled="disabled">
    </label>
</template>

<style scoped lang="scss">
    label {
        @include flex-col;
        gap: 0;
        // color: $clr-secondary;
        width: 100%;

        p {
            margin: 0;
            padding-bottom: .25em;

            span {
                padding-left: .1em;
            }
        }

        input {
            border-radius: 5px;
            border: 2px solid $clr-secondary;
            background-color: white;
            padding-block: .5em;
            padding-inline: .25em;

            &:focus {
                outline: none;
                // border: 4px solid $clr-secondary;
            }

            &:disabled {
                opacity: .45;
            }
        }
    }
</style>