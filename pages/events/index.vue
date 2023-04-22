<script setup lang = "ts">
    import { ref, watch, computed } from 'vue';
    import TiltedBubble from '@/components/TiltedBubble.vue';
    import TiltedHeading from '@/components/TiltedHeading.vue';
    import EventsCard from '@/components/EventsCard.vue';
    import { DatePicker } from 'v-calendar';
    import StartTimePicker from '@/components/FormFields/StartTimePicker.vue';
    import EndTimePicker from '@/components/FormFields/EndTimePicker.vue';
    import BookingPeopleCount from '@/components/FormFields/BookingPeopleCount.vue';

    const date = ref(new Date())
    const startTime = ref(new Date())
    const endTime = ref(new Date())
    const peopleCount = ref(0)
</script>

<template>
    <section class = "events-splash">
        <!-- Left Sticker -->
        <img class="splash-sticker-l" src="@/assets/images/Events_Stickers_L.png" width="190" height="250" alt="">

        <div class = "splash-heading">
            <p class = "text-h-giant">Sew...</p>
            <TiltedBubble>booking</TiltedBubble>
            <p class = "text-h-giant">a session?</p>
        </div>

        <!-- Right Sticker -->
        <div class = "splash-sticker-container">
            <img class="splash-sticker-r" src="@/assets/images/Events_Stickers_R.png" width="150" height="175" alt="">
        </div>

        <div class = "calendar">
            <DatePicker v-model="date" class = "date-picker"/>
            <div class="booking-input">
                <div class = "time-picker">
                    <StartTimePicker :date="date" v-model="startTime"/>
                    <EndTimePicker :is-disabled="false" :start-time="startTime" v-model="endTime"/>
                </div>
                <BookingPeopleCount v-model="peopleCount"/>
            </div>
            <div class = "book-now">
                <p class = "caption">Total Amount (VAT inclusive): 25 AED</p>
                <button>
                    <h>BOOK NOW!</h>
                </button>
            </div>
        </div>
    </section>

    <section class = "upcoming-events">
        <!-- Page Heading -->
        <div class="heading-container">
            <div class="page-heading">
                <TiltedHeading class = "tilted-heading">
                    upcoming
                </TiltedHeading>
                <h1 class="text-h-big-boy main-heading">Sewcial Events</h1>
            </div>
        </div>
        
        <!-- Cards -->
        <div class = "card-container">
        <div class = "grid-container">
            <div class = "card-grid">
            <EventsCard :image="'src/assets/images/OpenMic.png'">
                <template #event-name>OPEN MIC</template>
                <template #date>Saturday, Your Mom</template>
            </EventsCard>
            <EventsCard :image="'src/assets/images/BoardGamesNight.png'">
                <template #event-name>ITEM NAME</template>
                <template #date>OWNER</template>
            </EventsCard>
            <EventsCard :image="'src/assets/images/CommunitySale.png'">
                <template #event-name>ITEM NAME</template>
                <template #date>OWNER</template>
            </EventsCard>
            </div>
        </div>
        </div>


    </section>

    <section class = "workshops">
        <img class = "sticker-left" src="@/assets/images/Sticker_5.png">

        <div class = "sticker-container">
            <img class = "sticker-right" src="@/assets/images/Sticker_6.png">
        </div>
    </section>
</template>

<!-- Styling -->
<style scoped lang = "scss">
    .events-splash {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        margin-block: 3em;

        @include media (tablet) {
            flex-direction: row;
            justify-content: center;
            align-content: center;
            gap: 2em;
        }

        .splash-sticker-l {
            display: none;
            position: absolute;
            right: 92%;
            top: 22%;
            height: fit-content;

            @include media (desktop) {
                display: flex;
            }
        }

        .splash-sticker-container {
            display: none;
            position: absolute;
            right: 0%;
            bottom: 0%;
            left: 93%;
            top: 25%; 
            overflow: hidden;
            height: fit-content;
            
            .splash-sticker-r {
                height: auto;
            }

            @include media (desktop) {
                display: flex;
            }
        }

        .splash-heading {
            display: flex;
            flex-direction: column;
            color: $clr-secondary;
            margin-bottom: 3em;

            p {
                position: relative;
                margin: -10px 0 0 15px;
            }
        }

        .calendar {
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            background-color: $clr-secondary;
            padding: 1.5em;
            border-radius: 10px;
            .booking-input {
                margin-block: 1em;
                .time-picker {
                    display: flex;
                    flex-direction: row;
                    gap: 1em;
                }
            }

            .book-now {
                border-top: 1px dashed $clr-primary;
                width: 100%;

                p {
                    font-weight: 700;
                    color: $clr-primary;
                    margin-bottom: 0%;
                }
                button {
                    border: none;
                    border-radius: 10px;
                    background-color: $clr-accent-1;
                    color: $clr-primary;
                    padding: 1em;
                    width: 100%;
                    margin-block: 0.5em;
                }
            }
            
        }
    }

    .upcoming-events {
        background-color: $clr-accent-1;

        .heading-container {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            padding-block: 2em;

            .tilted-heading {
                background-color: $clr-secondary;
                color: $clr-accent-1;
            }

            h1 {
                text-transform: capitalize;
                color: $clr-primary;
                position: relative;
                margin: -22px 0 0 15px;
            }
        }

        .grid-container {
            margin-inline: 1em;
            .card-grid {
                display: grid;
                width: 100%;
                
                align-content: center;
                
                @include media (tablet) {
                    grid-template-columns: 25% 25% 25%;
                    justify-content: center;
                }
            }

            @include media (tablet) {
                margin-inline: auto;
            }
        }
        
    }

    .workshops {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        
        .sticker-left {
            display: none;
            position: relative;
            right: 0%;
            bottom: 0%;
            left: -18%;
            top: 0%; 
            width: fit-content;

            @include media (desktop) {
                display: flex;
            }
        }

        .sticker-container {
            display: none;
            position: relative;
            right: 0%;
            bottom: 0%;
            left: 75%;
            top: 0%;

            overflow: hidden;
            height: fit-content;

            @include media (desktop) {
                display: flex;
                overflow: hidden;
            }

            .sticker-right {
                height: auto;
            }
        }
    }
</style>