<template>
    <div class="chips">
        <div class="chips__playground" ref="choices" />
        <div class="chips__choices">
            <Chip1
                id="chip1"
                v-if="userAmount < 100 && userAmount > 0"
                :handleClick="event => { handleSelectChip(0, 'chip1'); handleSetBet(1) }"
            />
            <Chip5
                id="chip5"
                v-if="userAmount >= 10 && userAmount > 0"
                :handleClick="event => { handleSelectChip(1, 'chip5'); handleSetBet(5) }"
            />
            <Chip25
                id="chip25"
                v-if="userAmount >= 25 && userAmount > 0"
                :handleClick="event => { handleSelectChip(2, 'chip25'); handleSetBet(25) }"
            />
            <Chip50
                id="chip50"
                v-if="userAmount >= 50 && userAmount > 0"
                :handleClick="event => { handleSelectChip(3, 'chip50'); handleSetBet(50) }"
            />
            <Chip100
                id="chip100"
                v-if="userAmount >= 100 && userAmount > 0"
                :handleClick="event => { handleSelectChip(4, 'chip100'); handleSetBet(100) }"
            />
        </div>
    </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import uuid from 'uuid';
import { setRandom } from 'helpers/Position';
import Chip1 from 'components/atoms/Chips/1';
import Chip5 from 'components/atoms/Chips/5';
import Chip25 from 'components/atoms/Chips/25';
import Chip50 from 'components/atoms/Chips/50';
import Chip100 from 'components/atoms/Chips/100';

export default {
    props: {
        userAmount: {
            type: Number
        },
        handleSetBet: {
            type: Function
        },
        handleSetChips: {
            type: Function
        },
        handleUpdateBet: {
            type: Function
        },
        handleUpdateChips: {
            type: Function
        }
    },
    components: {
        Chip1,
        Chip5,
        Chip25,
        Chip50,
        Chip100
    },
    data() {
        return {
            Chips: [
                Chip1,
                Chip5,
                Chip25,
                Chip50,
                Chip100 
            ]
        };
    },
    methods: {
        handleSelectChip(key, current) {
            const currentSelected = document.getElementById(current).getBoundingClientRect();

            const Component = Vue.extend(this.Chips[key]);
            const newComponent = new Component({
                propsData: {
                    handleClick: event => this.handleRemoveChip(event.target)
                }
            });
            newComponent.$mount();
            newComponent.$el.style.position = 'absolute';
            newComponent.$el.style.top = currentSelected.top + 'px';
            newComponent.$el.style.left = currentSelected.left + 'px';
            this.$refs.choices.appendChild(newComponent.$el);

            let id = uuid(),
                positionTop = setRandom(42, 58) + '%',
                positionLeft = setRandom(42, 58) + '%';
            
            setTimeout(() => {
                newComponent.$el.id = id;
                newComponent.$el.style.top = positionTop;
                newComponent.$el.style.left = positionLeft;
                newComponent.$el.style.transform = 'translate(-50%, -50%)';
                this.handleSetChips({ id: id, chip: key, top: positionTop, left: positionLeft });
            }, 100);
        },
        handleRemoveChip(chip) {
            const currentChip = chip.parentNode;
            currentChip.style.top = '125%';
            this.handleUpdateChips(currentChip.getAttribute('id'));
            this.handleUpdateBet(currentChip.getAttribute('value'));
            
            setTimeout(() => {
                this.$refs.choices.removeChild(currentChip);
            }, 100);
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.chips {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    display: flex;

    &__playground {
        flex-grow: 1;
    }

    &__choices {
        padding-bottom: 30px;
        text-align: center;
        flex-grow: 0;

        > a {
            margin: 0 0.5%;

            &:hover {
                transform: translateY(-10%);
            }

        }

    }

}
</style>