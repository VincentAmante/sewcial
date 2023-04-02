<script setup lang="ts">
    // Import of a speechbubble
    import SpeechBubble from '@/components/SpeechBubble.vue';
    import LogoWhite from '@/components/TheHeader/HeaderLogo.vue';
</script>
<template>
    <main>
        
        <!-- Just test divs, don't mind -->
        <div class="test">
            <div class="test-wrapper">
                <h1>Happy Birthday Binoboelle!!</h1>
                <!-- A component with slots in action -->
                <SpeechBubble class="speech">
                    <div class="img-wrapper">
                        <img src="/images/team-icons/icen.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Icen</h2>
                        <p>Hey loser! Happy b-day to you, hope we'll still be hanging around for the next one!</p>
                        <p>For my gift I'll actually start the work of implementation you and Frankie's designs soon LMAO</p>
                    </div>
                </SpeechBubble>

                <!-- Component with a prop, the one above uses a default -->
                <SpeechBubble alignment="right" class="speech alt">
                    <div class="img-wrapper">
                        <img src="/images/team-icons/frnk.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Frankie</h2>
                        <p>Hi biebert happy bierthday &#60;3 here’s to more… “ok lets go?”s!!!</p>
                        <p>So… hangout soon?</p>
                    </div>
                </SpeechBubble>

                <SpeechBubble class="speech">
                    <div class="img-wrapper">
                        <img src="/images/team-icons/nella.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Nella</h2>
                        <p>Happy birthday biebert!!! You are so cute and so old 🥸 Congrats on finishing 20 years because you have done a great job so far and i can’t wait to see what you do with the next 20 and then the next 20 and then the ne</p>
                    </div>
                </SpeechBubble>

                <SpeechBubble alignment="right" class="speech alt">
                    <div class="img-wrapper">
                        <img src="/images/team-icons/louis.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Louis</h2>
                        <p>hiii pistachio avocado brie camembiert &#60;3</p>

                        <p>happiest birthday !! i wish you bluebirds in the spring :p i really love seeing how you and our friendships have grown ugh - my birthday gift will be a redeemable coupon to get me to drag u with me in laufeys next concert jkfds happy twentieth my fellow green friend 💚 love you alw!!</p>
                    </div>
                </SpeechBubble>

                
                <SpeechBubble class="speech">
                    <div class="img-wrapper">
                        <img src="/images/team-icons/nehan.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Nehan</h2>
                        <p>Happiest birthday habibiee, I got a question. You're TWENNY?! it's okay bb girl no one needs to know! My overcooked, boba, khokh mishmish partner is twenny omgg, love hanging out with you and wish to be around in your next too :))</p>
                    </div>
                </SpeechBubble>

                <h1>Hope you enjoy your day Bie!</h1>
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
            max-width: 800px;
            width: 70%;
            @include flex-col;
            align-items: center;
            justify-content: center;
            padding-top: 4vmin;
        }
    }

    h1 {
        color: $clr-secondary;
    }
    .speech {
        @include flex;
        gap: 1em;
        padding-block: 1em;

        .img-wrapper {
            @include flex-col;
            padding-top: 1em;
            
            img {
                width: 12vmin;   
            }
        }

        &.alt {
            flex-direction: row-reverse ;

            .content {
                text-align: justify;
            }
        }
    }


</style>