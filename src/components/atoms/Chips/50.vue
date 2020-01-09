<template>
    <a role="button" @click="handleClick" value="50" class="chip">
        <img src="public/images/chips/50.svg" />
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