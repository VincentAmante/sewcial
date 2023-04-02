<script setup lang="ts">
    // Import of a speechbubble
    import SpeechBubble from '@/components/SpeechBubble.vue';
</script>
<template>
    <main>
        <!-- Just test divs, don't mind -->
        <div class="test">
            <div class="test-wrapper">
                <!-- A component with slots in action -->
                <SpeechBubble>
                    <h2>Hey!</h2>
                    <p>This speech bubble adapts to anything</p>
                    <p>Still needs some more tweaks though to adapt to all possible options 
                        (placing of this marker on the left for example)</p>
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