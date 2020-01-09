<template>
    <div class="cards">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.cards {
    position: absolute;
    z-index: 1;
    top: 0;
    font-size: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-30%);

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