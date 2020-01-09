<template>
    <TemplateGame
        :isDraw="this.isDraw"
        :didWin="this.didWin"
        :gamePot="this.gamePot"
        :dealIsSet="this.dealIsSet"
        :userAmount="this.userAmount"
        :handleSetDeal="handleSetDeal"
        :handleNewRound="handleNewRound"
        :handleFoldRound="handleFoldRound"
    >
        <CardsDealer
            :pokerHands="pokerHands"
            :dealIsSet="this.dealIsSet"
            :dealerStatus="this.dealerStatus"
            :dealerSelection="this.dealerSelection"
            :amountDealerChange="this.amountDealerChange"
        />
        <ChipsOverview
            :didWin="this.didWin"
            :dealIsSet="this.dealIsSet"
            :chipSelection="this.chipSelection"
        />
        <CardsUser
            :pokerHands="pokerHands"
            :dealIsSet="this.dealIsSet"
            :userStatus="this.userStatus"
            :userSelection="this.userSelection"
            :handleSelectCard="handleSelectCard"
            :changeSelection="this.changeSelection"
        />
    </TemplateGame>
</template>

<script>
import { mapGetters } from 'vuex';
import pokerHands from 'data/hands.json';

export default {
    data() {
        return {
            pokerHands: pokerHands
        }
    },
    components: {
        TemplateGame: () => import('components/templates/Game'),
        CardsUser: () => import('components/organisms/Cards/User'),
        CardsDealer: () => import('components/organisms/Cards/Dealer'),
        ChipsOverview: () => import('components/organisms/Chips/Overview')
    },
    computed: {
        ...mapGetters({
            cards: 'Poker/cards',
            isDraw: 'Poker/isDraw',
            didWin: 'Poker/didWin',
            gamePot: 'Poker/gamePot',
            dealIsSet: 'Poker/dealIsSet',
            userAmount: 'Poker/userAmount',
            userStatus: 'Poker/userStatus',
            dealerChange: 'Poker/dealerChange',
            dealerStatus: 'Poker/dealerStatus',
            chipSelection: 'Poker/chipSelection',
            userSelection: 'Poker/userSelection',
            changeSelection: 'Poker/changeSelection',
            dealerSelection: 'Poker/dealerSelection',
            amountDealerChange: 'Poker/amountDealerChange'
        })
    },
    methods: {
        handleSelectCard(card) {
            this.$store.dispatch('Poker/getSelectedCards', card);
        },
        handleSetDeal() {
            this.$store.dispatch('Poker/replaceSelectedCards', [ this.cards, this.userSelection, this.changeSelection ]);
            this.$store.dispatch('Poker/emptySelectedCards');
            this.$store.dispatch('Poker/changeDealerCards');
            this.$store.dispatch('Poker/setDeal', [ true, this.userSelection, this.dealerSelection ]);
        },
        handleNewRound() {
            this.$store.dispatch('Poker/setNewRound');
        },
        handleFoldRound() {
            this.$store.dispatch('Poker/foldRound', this.gamePot);
        }
    },
    mounted() {
        this.$store.dispatch('Poker/getUserCards', this.cards);
        this.$store.dispatch('Poker/getDealerCards', this.cards);
    }
};
</script>