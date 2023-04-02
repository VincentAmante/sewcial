<script setup lang="ts">

// Import download button icon
import ButtonDownload from './icons/ButtonDownload.vue';

// Variables passed to this component are props
const props = defineProps({
    alignment: {
        type: String,
        required: true,
        default: 'left'
    },

    image: {
        type: String,
        required: true
    }
})
</script>

<!-- Browse Image Card Templates -->
<template>
        <div class="cards-container">
        <div class="card">
          <div class="card-image" :style="{ backgroundImage: `url(${image})` }"></div>
            <div class="card-info-container">
                <div class="card-info" :class="alignment">
                    <div class="card-text">
                        <slot name="text"></slot>
                    </div>
                    <ButtonDownload></ButtonDownload>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .cards-container {
        padding: .75em;
        margin: 5px;
        width: 70%;
    }
    .card {
        position: relative;
    }
    .icon{
        width: 20px;
        height: 20px;
    }
    .card-info {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $clr-primary;
        padding-block: 0;
        padding-inline: 1.5rem;
    }
    // Images
    .card-image{
        aspect-ratio: 1 / 1;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 20px;
        width: 100%;
        vertical-align: middle;
    }
    .card-image:hover{
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
        filter: brightness(80%);
        cursor: pointer;
    }
    .card:hover .card-info{
        height: 6rem;
        transform: translateY(0);
        cursor: pointer;
        border-top: 3px dashed $clr-primary;
        // outline: dashed 3px $clr-primary;
        // outline-offset: 1px;
    }

    // Moved styling to a container here
    .card-info-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // background-color: #fff;
        color: $clr-text;
        // padding: 0 1.5rem;
        border-radius: 0px 0px 20px 20px;
        overflow: hidden; /* hide content that overflows */
        transition: height 0.3s ease-in-out; /* animate height change */
    }

    .card:hover .card-info-container {
        height: 6rem;
        transform: translateY(0);
        cursor: pointer;
        border-top: 3px dashed $clr-primary;
    }
</style>