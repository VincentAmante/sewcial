<script setup lang="ts">
    import { ref, computed } from 'vue';
    import ButtonClose from './icons/ButtonClose.vue';

    const isOpen = ref(false)
    const props = defineProps({
        // Name of the area the desc is about
        name: {
            type: String,
            required: true
        },

        // source for thumbnail, should be path from public
        imgSrc: {
            type: String,
            required: true
        }
    })

    // Listens for an event based on the prop<name> to open
    // See TestViewIcen to see how that operates
    window.addEventListener(`toggle-${props.name}`, () => {

        isOpen.value = true
    })

    function close(){
        isOpen.value = false
    }

    // Computed variables will watch for certain variables inside its code
    const toggledStyle = computed(() => {
        if (isOpen.value){
            return 'toggled'
        } else {
            return ''
        }
    })
</script>

<template>
    <div class="description-slider-wrapper" :class="toggledStyle">
        <div class="description-slider">
            <div class="button-close">
                <!-- DEV: ButtonClose has a function for when the 'close-btn-clicked' emit is triggered -->
                <ButtonClose @close-btn-clicked="close"></ButtonClose>
            </div>
            <div class="slider-content">
                <div class="img-wrapper">
                    <img :src="imgSrc" alt="">
                </div>
                <div class="content">
                    <h1>
                        <slot name="title"></slot>
                    </h1>
                    <div class="description">
                        <slot>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .description-slider-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 105;
        pointer-events: none;

        .description-slider {
            pointer-events: all;

            // opacity: 0;
            position: relative;
            transition: all ease-out .15s;
            transform: translateX(-100%);
            background-color: $clr-primary;
            max-width: 100%;
            height: 100vh;
            
            .button-close {
                position: absolute;
                right: 0;
                padding-top: $margin-height-mobile;
                padding-right: $margin-width-mobile;
            }

            .slider-content {
                @include flex-col;
                height: 100%;
                justify-content: center;
                padding-inline: $margin-width-mobile;

                .content {
                    color: $clr-secondary;

                    .description {
                        &:deep(p) {
                            color: $clr-secondary;
                            text-align: justify;
                        }
                    }

                }
            }

            @include media(lg){
                flex-direction: row;
                width: 50vw;
                .slider-content {
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    padding-left: initial;

                    .content {
                        max-width: 50%;
                    }
                }
            }
        }

        &.toggled {
            background-color: rgba(0, 0, 0, 0.2);
            pointer-events: initial;

            .description-slider {
                transform: initial;
            }
        }

        .img-wrapper {
            max-width: 100vw;
            object-fit: contain;

            img {
                width: 100%;
            }
        }
    }

</style>