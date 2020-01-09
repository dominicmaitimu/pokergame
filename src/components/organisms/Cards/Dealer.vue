<template>
    <div :class="[dealIsSet && 'cards__focussed', 'cards']">
        <div v-for="(item, index) in dealerSelection" :key="index" class="cards__item">
            <img v-if="dealIsSet" :src="`public/images/${ item.sign }/${ item.value }.svg`" />
            <img v-else :src="Back" />
        </div>
        <p v-if="amountDealerChange >= 1 && !dealIsSet">Dealer will replace {{ amountDealerChange }} {{ amountDealerChange > 1 ? 'cards' : 'card' }}</p>
        <p v-if="dealIsSet">{{ pokerHands[dealerStatus] }}</p>
    </div>
</template>

<script>
import Back from 'assets/images/cards/back.svg';

export default {
    props: {
        dealIsSet: {
            type: Boolean
        },
        dealerStatus: {
            type: Number
        },
        dealerSelection: {
            type: Array
        },
        amountDealerChange: {
            type: Number
        },
        pokerHands: {
            type: Array
        }
    },
    data() {
        return {
            Back: Back
        };
    }
};
</script>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.cards {
    position: absolute;
    z-index: 2;
    top: 0;
    font-size: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-30%);
    transition: transform 300ms ease;

    > p {
        position: absolute;
        top: calc(100% + 12px);
        left: 50%;
        color: $white;
        margin: 0;
        padding: 10px 15px;
        border: 2px solid rgba($black, .35);
        border-radius: 4px;
        line-height: $font-size-sm;
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, -100%);
        background-color: rgba($black, .15);
        animation: fadeIn 200ms forwards;
        animation-delay: 1000ms;
    }

    &__item {
        width: 15%;
        margin: 0 -3.5%;
        transform: translateY(-100%);
        display: inline-block;
        animation: retractCard 200ms forwards;

        img {
            width: 100%;
        }

        &:nth-child(2) {
            animation-delay: 200ms;
        }

        &:nth-child(3) {
            animation-delay: 400ms;
        }

        &:nth-child(4) {
            animation-delay: 600ms;
        }

        &:nth-child(5) {
            animation-delay: 800ms;
        }
        
    }

    &__focussed {
        transform: translateY(10px);
    }

}

@keyframes fadeIn {
    
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, 0%);
    }

}

@keyframes retractCard {
    
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0%);
    }

}
</style>