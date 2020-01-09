<template>
    <a role="button" @click="handleClick" value="100" class="chip">
        <img src="public/images/chips/100.svg" />
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