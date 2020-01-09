<template>
    <div class="page">
        <aside class="amount">
            <p class="amount__pot">&euro; {{ gamePot }}</p>
            <p class="amount__user">&euro; {{ userAmount }}</p>
        </aside>
        <aside class="actions">
            <router-link v-if="dealIsSet && userAmount < 1" to="/">New game</router-link>
            <router-link v-if="dealIsSet && userAmount > 0" v-on:click.native="handleNewRound" to="/">New round</router-link>
            <button v-if="!dealIsSet" @click="handleSetDeal">Deal</button>
            <router-link v-if="!dealIsSet" v-on:click.native="handleFoldRound" to="/">Fold</router-link>
        </aside>
        <Alert v-if="dealIsSet && didWin && !isDraw" type="win">You win</Alert>
        <Alert v-if="dealIsSet && !didWin && !isDraw" type="lose">You lose</Alert>
        <Alert v-if="dealIsSet && !didWin && isDraw" type="draw">Draw</Alert>
        <main>
            <slot />
        </main>
    </div>
</template>

<script>
export default {
    components: {
        Alert: () => import('components/atoms/Alert/Default')
    },
    props: {
        isDraw: {
            type: Boolean
        },
        didWin: {
            type: Boolean
        },
        gamePot: {
            type: Number
        },
        dealIsSet: {
            type: Boolean
        },
        userAmount: {
            type: Number
        },
        handleSetDeal: {
            type: Function
        },
        handleNewRound: {
            type: Function
        },
        handleFoldRound: {
            type: Function
        }
    }
};
</script>

<style lang="scss">
@import 'assets/stylesheets/Default';
</style>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.page {
    overflow: hidden;

    .amount {
        position: absolute;
        z-index: 2;
        top: 21px;
        right: 25px;

        > p {
            text-align: right;
            letter-spacing: 0.025em;
            text-shadow: -3px 2px 3px rgba($black, .6);
        }

        &__pot {
            font-size: $font-size-h1;
            font-weight: bold;
            color: $white;
            margin: 0 0 10px;
            line-height: $font-size-h1;
        }

        &__user {
            font-size: $font-size-h2;
            color: $gray;
            margin: 0;
            line-height: $font-size-h2;
        }

    }

    .actions {
        position: absolute;
        z-index: 2;
        top: 50%;
        right: 0;
        width: calc(15% - 15px);
        min-width: 175px;
        padding-right: 25px;
        opacity: 0;
        transform: translate(100%, -50%);
        box-sizing: border-box;
        animation: fadeIn 200ms forwards;
        animation-delay: 1000ms;

        > a {
            line-height: 56px;
        }

        > a, > button {
            font-size: $font-size-h3;
            color: $white;
            width: 100%;
            height: 56px;
            margin-bottom: 15px;
            border: 2px solid rgba($black, .35);
            border-radius: 4px;
            text-align: center;
            text-transform: uppercase;
            cursor: pointer;
            background-color: rgba($black, .15);
            display: block;
            transition: border-color 300ms ease, background-color 300ms ease;

            &:hover {
                border-color: transparent;
                background-color: $black;
            }

            &:last-child {
                margin: 0;
            }

        }

    }

    main {
        max-width: 1440px;
        height: 100%;
        margin: 0 auto;

        &:before,
        &:after {
            content: "";
            position: absolute;
            z-index: 0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &:before {
            width: 40%;
            padding-bottom: 40%;
            border-radius: 50%;
            border: 15px solid rgba($white, .05);
            background-color: transparent;
        }

        &:after {
            width: 25%;
            padding-bottom: 25%;
            opacity: .05;
            background: url('~assets/images/logo_white.svg') no-repeat center;
        }

    }

}

@keyframes fadeIn {
    
    0% {
        opacity: 0;
        transform: translate(100%, -50%);
    }

    100% {
        opacity: 1;
        transform: translate(0, -50%);
    }

}
</style>