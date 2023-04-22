<script setup lang="ts">

// Variables passed to this component are props
const props = defineProps({
    alignment: {
        type: String,
        default: 'center'
    },
    
    imgSrc: {
        type: String,
        required: true
    }
})
</script>

<!-- Team Member Card -->
<template>
<!-- <div class="team-container"> -->
    <div class="member-card">
        <div class="member-image">
            <img :src="imgSrc">
        </div>
        <div class="member-details">
            <div class="member-name" :class="alignment"> 
            <p><slot name="name"></slot></p>
            </div>

            <div class="member-role">
            <p><slot name="role"></slot></p>
            </div>
        </div>
    </div>
<!-- </div> -->
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">

.member-card{
    text-align: center;
    margin: 10px;
}
img{
    width: 100%;
}
.member-card:hover{
    transform: scale(1.1);
    transition: transform 0.5s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
}
.member-role{
    margin-top: -10px;
}
.member-name p{
    color: $clr-primary;
    font-weight: 500;
}
.member-role p{
    color: $clr-accent-2;
}
// .team-container{
//     @include flex;
//     justify-content: center;
//     align-items: center;
// }
// .member-card{
//     @include flex-col;
//     align-items: center;
// }
// .member-details{
//     @extend .member-card;
// }
</style>