<template>
    <BetGame
        :gamePot="this.gamePot"
        :userAmount="this.userAmount"
    >
        <ChipsSelector
            :handleSetBet="handleSetBet"
            :userAmount="this.userAmount"
            :handleSetChips="handleSetChips"
            :handleUpdateBet="handleUpdateBet"
            :handleUpdateChips="handleUpdateChips"
        />
    </BetGame>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: {
        BetGame: () => import('components/templates/Bet'),
        ChipsSelector: () => import('components/organisms/Chips/Selector')
    },
    computed: {
        ...mapGetters({
            gamePot: 'Poker/gamePot',
            userAmount: 'Poker/userAmount'
        })
    },
    methods: {
        handleSetBet(amount) {
            this.$store.dispatch('Poker/setBet', amount);
        },
        handleUpdateBet(amount) {
            this.$store.dispatch('Poker/updateBet', amount);
        },
        handleSetChips(selection) {
            this.$store.dispatch('Poker/getChips', selection);
        },
        handleUpdateChips(id) {
            this.$store.dispatch('Poker/updateChips', id);
        }
    }
};
</script>