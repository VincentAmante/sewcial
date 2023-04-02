<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import PageCounter from '@/components/PageCounter.vue';
import Incrementor from '@/components/Incrementor.vue';
import EventField from '@/components/FormFields/EventField.vue'
import BookingSummary from '@/components/BookingSummary.vue';
import { computed, ref } from 'vue';


const maxPages = 5;
const page = ref(1);
const incrementPage = () => {
    if (page.value < maxPages) page.value++;
}
const decrementPage = () => {
    if (page.value > 1) page.value--;
}

// Reactive data for form values
// TODO: Add function to compile data before sending to backend
// TODO: Abstract each section for cleaner file
// TODO: Add validation for each section

// Booking 1 - Workshops
const sampleWorkshops = ref([
    {
        activity: 'Kids & Teens Sewing Club',
        price: 45,
        slots: 0,
    },
    {
        activity: 'Lorem Ipsew',
        price: 15,
        slots: 0,
    },
    {
        activity: 'Needlework Socialist Society',
        price: 20,
        slots: 0,
    }
])
const totalSlots = computed(() => {
    let total = 0;
    sampleWorkshops.value.forEach(workshop => {
        total += workshop.slots;
    });

    return total;
})
const totalCost = computed(() => {
    let total = 0;
    sampleWorkshops.value.forEach(workshop => {
        total += workshop.price * workshop.slots;
    });

    return total;
})

// Booking 2 - Extra Info
const extraInfo = ref('');

// Booking 3 - Personal Details
const personalDetails = ref({
    firstName: {
        value: '',
        error: false,
        errorMessage: ''
    },
    lastName: {
        value: '',
        error: false,
        errorMessage: ''
    },
    email: {
        value: '',
        error: false,
        errorMessage: ''
    },
    mobileNumber: {
        value: '',
        error: false,
        errorMessage: '',
    }
})

// Booking 4 - Payment Options
const cardDetails = ref({
    cardNumber: {
        value: '',
        error: false,
        errorMessage: ''
    },
    expiryDate: {
        value: '',
        error: false,
        errorMessage: ''
    },
    cvv: {
        value: '',
        error: false,
        errorMessage: ''
    },
    zipCode: {
        value: '',
        error: false,
        errorMessage: ''
    }
})
const paymentOption = ref('');
function setPaymentOption(option: string) {
    paymentOption.value = option;
}
</script>

<template>
    <main>
        <section>
            <div class="booking-header">
                <div @click="decrementPage()">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="chevron-left"/>
                </div>
                <div>
                    <PageCounter :page-count="page" :total-pages="maxPages"></PageCounter>
                </div>
            </div>
            <div class="content-container">
                <div class="content">

                    <!-- TODO: Refactor how pages are decided so transition is smoother -->
                    <Transition mode="out-in">
                        <section id="workshops" v-if="page === 1">
                            <ul>
                                <li v-for="workshop in sampleWorkshops">
                                    <div>
                                        <h3>{{ workshop.activity }}</h3>
                                        <p>AED {{ workshop.price }}</p>
                                    </div>
                                    <Incrementor v-model="workshop.slots" :text="workshop.activity"></Incrementor>
                                </li>
                            </ul>
                            <div class="totals">
                                <div class="text-h3">SLOTS: {{ totalSlots }}</div>
                                <div class="text-h3">TOTAL: {{ totalCost }}</div>
                            </div>
                        </section>

                        
                        <section id="extra-info" v-else-if="page === 2">
                            <h3>If there is any extra information, please note it here</h3>
                            <p>Eg: Accessibility (we have a rooftop that hosts the events)</p>
                            <textarea name="extra-info" id="" cols="30" rows="10" v-model="extraInfo"></textarea>
                        </section>

                        <section id="personal-details" v-else-if="page === 3">
                            <h3>Add personal details</h3>
                            <div class="personal-details-form">
                                <EventField class="event-field" name="firstName" v-model="personalDetails.firstName.value">
                                    First Name
                                </EventField>
                                <EventField class="event-field" name="lastName" v-model="personalDetails.lastName.value">
                                    Last Name
                                </EventField>
                                <EventField class="event-field" name="email" v-model="personalDetails.email.value" type="email">
                                    Email Address
                                </EventField>
                                <EventField class="event-field" name="number" v-model="personalDetails.firstName.value" type="tel">
                                    Mobile Number 
                                </EventField>
                            </div>
                            <div class="booking-summary-container">
                                <div>
                                    <h3>Booking Summary</h3>
                                </div>
                                <ul class="booking-list">
                                    <li v-for="workshop in sampleWorkshops">
                                        <BookingSummary v-if="workshop.slots > 0">
                                            <template #date>Saturday, 18 March 2023</template>
                                            <template #name>{{ workshop.activity }}</template>
                                            <template #time>10:00am - 11:00am</template>
                                            <template #code>SW898LVMB4</template>
                                            <template #price>{{ workshop.price * workshop.slots }}</template>
                                            <template #count>{{ workshop.slots }}</template>
                                        </BookingSummary>
                                    </li>
                                </ul>
                            </div>
                        </section>


                        <section id="payment-info" v-else-if="page === 4">
                            <h3>Pay with</h3>
                            <div class="payment-options">
                                <div>
                                    <label class="payment-option" for="credit-debit">
                                        <div>
                                            <div class="custom-radio" @click="setPaymentOption('credit-debit')">
                                                <font-awesome-icon :icon="['far', 'circle']" v-if="paymentOption != 'credit-debit'"/>
                                                <font-awesome-icon :icon="['far', 'circle-dot']" v-else/>
                                            </div>
                                            <input type="radio" name="payment-type" id="" value="credit-debit">
                                            <p>Credit or Debit Card</p>
                                        </div>
                                        <svg width="37" height="25" viewBox="0 0 37 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.92361 0C0.861503 0 0.000329486 0.861174 0.000329486 1.92328V4.80787H36.539V1.92328C36.539 0.861174 35.6778 0 34.6157 0H1.92361ZM36.5387 10.5774H0V23.0767C0 24.1388 0.861174 25 1.92328 25H34.6147C35.6769 25 36.538 24.1388 36.538 23.0767L36.5387 10.5774ZM12.0197 21.1539C12.285 21.1539 12.5003 20.9389 12.5003 20.6733V19.7116C12.5003 19.446 12.285 19.231 12.0197 19.231H5.28885C5.02325 19.231 4.8082 19.446 4.8082 19.7116V20.6733C4.8082 20.9389 5.02326 21.1539 5.28885 21.1539H12.0197ZM25.0003 15.3848C25.0003 14.8539 25.4308 14.4231 25.9616 14.4231H30.7695C31.3004 14.4231 31.7308 14.8539 31.7308 15.3848V20.1923C31.7308 20.7235 31.3004 21.1539 30.7695 21.1539H25.9616C25.4308 21.1539 25.0003 20.7235 25.0003 20.1923V15.3848Z" fill="#607BDA"/>
                                        </svg>
                                    </label>
                                    <div class="card-details">
                                        <EventField name="card-number" v-model="cardDetails.cardNumber.value" :disabled="!(paymentOption === 'credit-debit')">
                                            Card Number
                                        </EventField>
                                        <EventField name="card-expiry" v-model="cardDetails.expiryDate.value" type="month" :disabled="!(paymentOption === 'credit-debit')">
                                            Expiry Date
                                        </EventField>
                                        <EventField name="security-code" v-model="cardDetails.cvv.value" :disabled="!(paymentOption === 'credit-debit')">
                                            Security Code
                                        </EventField>
                                        <EventField name="zip-code" v-model="cardDetails.zipCode.value" :disabled="!(paymentOption === 'credit-debit')">
                                            Zip Code
                                        </EventField>  
                                    </div> 
                                </div>
                                <div>
                                    <label class="payment-option" for="paypal">
                                        <div>
                                            <div class="custom-radio" @click="setPaymentOption('paypal')">
                                                <font-awesome-icon :icon="['far', 'circle']" v-if="paymentOption != 'paypal'"/>
                                                <font-awesome-icon :icon="['far', 'circle-dot']" v-else/>
                                            </div>
                                            <input type="radio" name="payment-type" id="" value="paypal">
                                            <p>Paypal</p>
                                        </div>
                                        <svg width="37" height="25" viewBox="0 0 37 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="37" height="25" rx="3" fill="#607BDA"/>
                                            <path d="M17.275 13.825C17.3584 13.825 19.2917 13.9083 20.4417 13.625H20.45C21.775 13.3 23.6167 12.3667 24.0917 9.31667C24.0917 9.31667 25.15 5.5 19.9 5.5H15.3917C14.9834 5.5 14.6334 5.8 14.5667 6.2L12.65 18.3333C12.6084 18.5833 12.8084 18.8167 13.0584 18.8167H15.9167L16.6167 14.3833C16.6667 14.0667 16.9417 13.825 17.275 13.825Z" fill="#FFFAE0"/>
                                            <path d="M24.8256 9.9082C24.1506 13.0165 22.0256 14.6582 18.6423 14.6582H17.4173L16.5589 20.0915C16.5256 20.3082 16.6923 20.4999 16.9089 20.4999H18.4923C18.7756 20.4999 19.0256 20.2915 19.0673 20.0082C19.1339 19.6749 19.5006 17.2415 19.5756 16.8249C19.6173 16.5415 19.8673 16.3332 20.1506 16.3332H20.5173C22.8673 16.3332 24.7089 15.3749 25.2506 12.6165C25.4673 11.4999 25.3506 10.5832 24.8256 9.9082Z" fill="#FFFAE0"/>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <div class="conditions-container">
                                <label for="conditions-acceptance">
                                    <input type="checkbox" name="conditions-acceptance" id="">
                                    I accept the <a href="">Terms of Service</a>, <a href="">Community Guidelines</a>, and Privacy Policy
                                </label>
                            </div>
                        </section>


                        <section id="booking-confirmed" v-else-if="page === 5">
                            <img src="/images/message-tick.svg" alt="">
                            <div class="text-h1">Booking Confirmed</div>
                            <p>Your booking code is SW898LVMB4. We’ve sent you the details in your email.</p>
                            <ul class="booking-list">
                                <li v-for="workshop in sampleWorkshops">
                                    <BookingSummary v-if="workshop.slots > 0">
                                        <template #date>Saturday, 18 March 2023</template>
                                        <template #name>{{ workshop.activity }}</template>
                                        <template #time>10:00am - 11:00am</template>
                                        <template #code>SW898LVMB4</template>
                                        <template #price>{{ workshop.price * workshop.slots }}</template>
                                        <template #count>{{ workshop.slots }}</template>
                                    </BookingSummary>
                                </li>
                            </ul>
                        </section>
                    </Transition>
                </div>
                <div class="page-btn-container">
                    <div>
                        <AppButton v-if="page > 1 && page != 5" @click="decrementPage()" class="btn prev-btn">Prev</AppButton>
                    </div>
                    <div>
                        <AppButton v-if="page < 5" @click="incrementPage()" class="btn next-btn">Next</AppButton>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
    main {
        // padding-block: $margin-height;
        padding-block: 1.5em;
        padding-inline: $margin-width;
    }

    .booking-header {
        @include flex;
        position: relative;
        justify-content: center;

        padding-inline: .75em;
        padding-block: 1em;
        background-color: $clr-secondary;
        border-radius: 20px 20px 0px 0px;
        color: $clr-primary;

        .chevron-left {
            position: absolute;
            left: 1em;
        }
    }

    .content-container {
        padding: 1.25em;
        padding-block: 1em;
        padding-bottom: .2em;
        border: 3px dashed $clr-secondary;
        border-top: 0;
        border-radius: 0px 0px 20px 20px;
        min-height: 65vh;
    }

    .btn {
        border-radius: 10px;

        &.prev-btn {
            background-color: $clr-accent-1;
        }
    }

    .page-btn-container {
        // @include flex;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        transition: all .15s ease-in-out;
        // justify-content: space-between;
        
        div {
            @include flex-centered;
        }

        @include media(tablet){
            @include flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 1em;
        }
    }

    #workshops {

        border: 2px solid $clr-secondary;
        border-radius: 20px;

        .totals {
            @include flex;
            justify-content: space-between;
            padding-block: .25em;
            padding-inline: 1em;
            border-top: 2px dashed $clr-secondary;
            color: $clr-secondary;
        }

        ul {
            @include scrollbar;
            list-style: none;
            overflow: scroll;
            overflow-x: hidden;
            height: 50vh;

            li {
                @include flex-col;
                align-items: center;
                text-align: center;
                padding-block: 1em;
                padding-inline: 1em;

                div {
                    h3, p {
                        margin: .25em;
                    }
                }
            }

            @include media(tablet){
                li {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    border-bottom: 2px dashed $clr-secondary;

                    &:last-of-type {
                        border-bottom: 0;
                    }
                }
            }
        }
    }

    #extra-info {
        textarea {
            width: 100%;
            border-radius: 20px;
            border: 2px solid $clr-secondary;
            resize: none;
            padding: 1em;
        }
    }

    #personal-details {
        @include flex-col;
        .personal-details-form {
            // display grid with 2 columns per row unless it's too big
            display: grid;
            grid-template-columns: 1fr;
            grid-auto-flow: row;
            gap: 1em;
            padding-block: 1em;
            border-bottom: 1px solid $clr-secondary;

            @include media(tablet){
                grid-template-columns: 1fr 1fr;
            }
        }

        .booking-summary-container {
            @include flex-col;
            padding-block: 1em;
            justify-content: space-between;
            border-bottom: 1px solid $clr-secondary;

            @include media(tablet) {
                flex-direction: row;
            }

            ul {
                @include flex-col;
                list-style-type: none;
            }
        }
    }

    #payment-info {
        // @include flex-col;

        .payment-options {
            .payment-option {
                @include flex;
                gap: .5em;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1em;

                div {
                    @include flex;
                    gap: .5em;
                    align-items: center;
                }

                svg {
                    height: 1.15em;
                }
            }

            & > div{
                border-bottom: 1px solid $clr-secondary;
            }

            .custom-radio {
                color: $clr-secondary;
            }
            input[type='radio']{
                display: none
            }

            @include media(tablet) {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1em;

                & > div {
                    padding-inline: 1em;
                    border-bottom: none;

                    &:first-child {
                        padding-right: 1.5em;
                        border-right: 1px solid $clr-secondary;
                    }
                }
            }
        }

        .conditions-container {
            padding-block: 1em;
        }

        .card-details {
            @include flex;
            flex-wrap: wrap;
            gap: 1em;
            padding-block: 1em;
            margin-block: 1em;
        }
    }

    #booking-confirmed {
        @include flex-col;
        align-items: center;
        padding-block: 1em;
        justify-content: space-between;
        border-bottom: 1px solid $clr-secondary;

        img {
            max-width: 200px
        }

        @include media(tablet) {
            // flex-direction: row;
        }

        ul {
            @include flex-col;
            list-style-type: none;
        }
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.15s ease-in;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transform: translateX(-5%);
    }

    .v-enter-from {
        opacity: 0;
        transform: translateX(5%);
    }
</style>