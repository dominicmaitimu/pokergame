<template>
    <div :class="[dealIsSet && 'cards__focussed', 'cards']">
        <div v-for="(item, index) in userSelection" :key="index" class="cards__item">
            <img
                @click="handleSelectCard(item)"
                :src="`public/images/${ item.sign }/${ item.value }.svg`"
                :class="[G.checkifExists(changeSelection, item) && 'cards__img__selected', 'cards__img']"
            />
        </div>
        <p v-if="!dealIsSet">Pick the cards you want to replace</p>
        <p v-if="dealIsSet">{{ pokerHands[userStatus] }}</p>
    </div>
</template>

<script>
import * as G from 'helpers/Game';

export default {
    props: {
        dealIsSet: {
            type: Boolean
        },
        userStatus: {
            type: Number
        },
        userSelection: {
            type: Array
        },
        handleSelectCard: {
            type: Function
        },
        changeSelection: {
            type: Array
        },
        pokerHands: {
            type: Array
        }
    },
    data() {
        return {
            G: G
        };
    }
};
</script>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.cards {
    position: absolute;
    z-index: 2;
    bottom: 0;
    font-size: 0;
    width: 100%;
    text-align: center;
    transform: translateY(30%);
    transition: transform 300ms ease;

    > p {
        position: absolute;
        bottom: calc(100% + 15px);
        left: 50%;
        color: $white;
        margin: 0;
        padding: 10px 15px;
        border: 2px solid rgba($black, .35);
        border-radius: 4px;
        line-height: $font-size-sm;
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, 100%);
        background-color: rgba($black, .15);
        animation: fadeIn 200ms forwards;
        animation-delay: 1000ms;
    }

    &__item {
        width: 15%;
        margin: 0 -3.5%;
        transform: translateY(100%);
        pointer-events: none;
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

    &__img {
        cursor: s-resize;
        pointer-events: all;
        transition: transform 300ms ease;

        &__selected {
            cursor: n-resize;
            transform: translateY(40%);
        }

    }

    &__focussed {
        transform: translateY(-10px);

        .cards__img {
            pointer-events: none;
        }

    }

}

@keyframes fadeIn {
    
    0% {
        opacity: 0;
        transform: translate(-50%, 100%);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, 0%);
    }

}

@keyframes retractCard {
    
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0%);
    }

}
</style>