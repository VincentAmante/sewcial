<script setup lang="ts">

// Import download button icon
import ButtonDownload from './icons/ButtonDownload.vue';

// Variables passed to this component are props
const props = defineProps({
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
            <!-- Image -->
            <div class = "card-image-container">
                <img :src="image" class="card-image" />
            </div>
            <!-- Info -->
            <div class="card-info-container">
                <div class="card-info">
                    <div class="card-text">
                        <h1><slot name="item-name"></slot></h1>
                        <h3><slot name="owner-name"></slot></h3>
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
        padding: 10px;
        .card {
        position: relative;
        height: 0;
        padding-bottom: 100%;
        }

        // Images
        .card-image-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 2rem;
            height: 100%;
            overflow: hidden;
        }

        .card-image{
            // overflow: hidden;
            // background-size: cover;
            // background-position: center;
            // border-radius: 20px;
            // vertical-align: middle;
            width: 100%;
            height: 100%;
            object-fit: cover;
            
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
        }

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
        .card-info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: $clr-primary;
            padding-block: 0;
            padding-inline: 1.5rem;
        }
    }

    .card:hover .card-info-container {
        height: 6rem;
        transform: translateY(0);
        cursor: pointer;
        border-top: 3px dashed $clr-primary;
    }
</style>