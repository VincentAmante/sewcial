<script setup lang="ts">
    // Import of a speechbubble
    import SpeechBubble from '@/components/SpeechBubble.vue';
    import TemplateHoverCard from '@/components/TemplateHoverCard.vue';
    import TeamPictures from '@/components/TeamPictures.vue';
    import Incrementor from '@/components/Incrementor.vue';
    import EventField from '@/components/FormFields/EventField.vue';
    import TiltedHeading from '@/components/TiltedHeading.vue';

    import {ref} from 'vue';
    const incrementorVal = ref(0);
</script>

<template>
    <main>
        <!-- Just test divs, don't mind -->
        <div class="test">
            <div class="test-wrapper">
                <!-- A component with slots in action -->
                <SpeechBubble>
                    <h2>Hey!</h2>
                    <p>These are all components by nehan! Feel free to drop thoughts and suggestions.</p>
                </SpeechBubble>

                <!-- Component with a prop, the one above uses a default -->
                <SpeechBubble alignment="right">
                    <h2>Also</h2>
                    <p>Since it uses vue slots, it's fully capable of inserting any HTML content inside</p>
                    <div>
                        <img src="/images/logo-white.svg" alt="">
                        <div class="caption">Look at that!</div>
                    </div>
                    <p>Though it seems I need to configure the spacing for text elements</p>
                </SpeechBubble>
                <p>---------------------------------------------------------------</p>
                <TemplateHoverCard :image="'https://i.pinimg.com/originals/81/fb/e1/81fbe1c31719a0bd6258fec7a34ad20c.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
                </TemplateHoverCard>
                <TemplateHoverCard :image="'https://scratchandstitch.com/wp-content/uploads/2019/09/denim-luggage-tags-diy-scratchandstitch-360x444@2x.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
                </TemplateHoverCard>
                <p>---------------------------------------------------------------</p>
                <h1>Meet the Team!</h1>
                <TeamPictures img-src="/images/team-icons/bie.png">
                    <template #name>Princelle Abbie</template>
                    <template #role>Role</template>
                </TeamPictures>
                <TeamPictures img-src="/images/team-icons/nehan.png">
                    <template #name>Nehan Tariq</template>
                    <template #role>Role</template>
                </TeamPictures>
                <TeamPictures img-src="/images/team-icons/icen.png">
                    <template #name>Vincent Amante</template>
                    <template #role>Role</template>
                </TeamPictures>
                <p>---------------------------------------------------------------</p>
                <!-- <PageCounter :total-pages="5" @change-page="handlePageChange" ></PageCounter>  -->
                <!-- <p>---------------------------------------------------------------</p> -->
                <h2>Booking Counter!</h2>
                <Incrementor v-model="incrementorVal">
                    <template #count></template>
                </Incrementor>
                <p>---------------------------------------------------------------</p>
                <h2>Text Fields</h2>
                <!-- <EventField :model-value="" :name="#name"></EventField> -->
                <p>---------------------------------------------------------------</p>
                <TiltedHeading>
                    COMMUNITY
                </TiltedHeading>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
    .test {
        max-width: 100%;
        @include flex-col;
        align-items: center;
        justify-content: center;
        padding-block: 10vmin;

        .test-wrapper {
            max-width: 600px;
            width: 50%;
            @include flex-col;
            align-items: center;
            justify-content: center;
            .icon{
                margin:10px;
            }
        }
    }
</style>