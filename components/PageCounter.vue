<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
    pageCount: {
        type: Number,
        default: 2
    },
    totalPages: {
        type: Number,
        required: true
    }
})
</script>

<template>
<ul>
    <li v-for="i in totalPages">
        <svg width="16" height="16" viewBox="0 0 16 16" :fill="(i <= pageCount) ? '#FFF' : '#607BDA'" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.5" stroke="white" :stroke-width="2"/>
        </svg>
    </li>
    <div class="line-container">
        <div class="line"></div>
    </div>
</ul>
</template>

<style scoped lang="scss">
    ul {
        @include flex;
        justify-content: space-between;
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: .75em;

        li {
            @include flex;
            @include flex-centered;
            padding-inline: .2em;
            font-size: 1.5em;
            z-index: 55;
        }
    }

    .line-container {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .line {
        position: absolute;
        height: .2em;
        width: 90%;
        background-color: white;
        z-index: 50;
    }
</style>