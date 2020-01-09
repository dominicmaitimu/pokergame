<template>
    <a role="button" @click="handleClick" value="5" class="chip">
        <img src="public/images/chips/5.svg" />
    </a>
</template>

<script>
export default {
    props: {
        handleClick: {
            type: Function,
            default: () => () => null
        }
    }
};
</script>