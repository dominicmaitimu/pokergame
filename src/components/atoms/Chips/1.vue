<template>
    <a role="button" @click="handleClick" value="1" class="chip">
        <img src="public/images/chips/1.svg" />
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