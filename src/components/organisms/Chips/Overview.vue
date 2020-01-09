<template>
    <div class="chips">
        <div class="chips__playground" ref="choices" />
    </div>
</template>

<script>
import Vue from 'vue';
import uuid from 'uuid';
import Chip1 from 'components/atoms/Chips/1';
import Chip5 from 'components/atoms/Chips/5';
import Chip25 from 'components/atoms/Chips/25';
import Chip50 from 'components/atoms/Chips/50';
import Chip100 from 'components/atoms/Chips/100';

export default {
    props: {
        didWin: {
            type: Boolean
        },
        dealIsSet: {
            type: Boolean
        },
        chipSelection: {
            type: Array
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
        handleSelectChip(key, top, left) {
            const Component = Vue.extend(this.Chips[key]);
            const newComponent = new Component();
            newComponent.$mount();
            newComponent.$el.id = uuid();
            newComponent.$el.style.position = 'absolute';
            newComponent.$el.style.top = top;
            newComponent.$el.style.left = left;
            newComponent.$el.style.transform = 'translate(-50%, -50%)';
            newComponent.$el.classList.add('chip__selected');
            this.$refs.choices.appendChild(newComponent.$el);
        }
    },
    mounted() {
        this.chipSelection.map(value => {
            this.handleSelectChip(value.chip, value.top, value.left);
        });
    },
    watch: {
        dealIsSet: function() {
            const choices = this.$refs.choices;

            if (choices.childNodes.length > 0 && this.dealIsSet) {
                for (let i = 0; i < choices.childNodes.length; i++) {
                    if (this.didWin) {
                        choices.childNodes[i].style.top = '90%';
                    } else {
                        choices.childNodes[i].style.top = '10%';
                    }
                }
                setTimeout(() => {
                    while (choices.hasChildNodes()) {
                        choices.removeChild(choices.firstChild);
                    }
                }, 100);
            }
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

}
</style>