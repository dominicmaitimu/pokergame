<template>
    <div class="chips">
        <div class="chips__playground" ref="choices" />
        <slot />
    </div>
</template>

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