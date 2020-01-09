// Base
import Vue from 'vue';
import VueRouter from 'vue-router';

// Components (async / chunks)
const Bet = () => import('components/pages/Bet');
const Game = () => import('components/pages/Game');

// Set Router
Vue.use(VueRouter);

export const router = new VueRouter({
    // mode: 'history',
    base: __dirname, // eslint-disable-line
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            component: Bet
        },
        {
            path: '/game',
            component: Game
        }
    ]
});