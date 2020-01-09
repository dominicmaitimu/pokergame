<template>
    <div :class="['alert', 'alert--' + type]">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'draw'
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'assets/stylesheets/_helpers/Variables';

.alert {
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;
    font-size: $font-size-lg;
    color: $white;
    padding: 15px 25px;
    border: 1px solid rgba($black, .35);
    border-radius: 4px;
    transform: translate(-50%, -50%);
    box-shadow: -3px 2px 3px rgba($black, .6);


    &--win {
        background-color: $alert-success;
    }

    &--lose {
        background-color: $alert-error;
    }

    &--draw {
        background-color: $alert;
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