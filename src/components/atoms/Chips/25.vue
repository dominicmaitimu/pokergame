<template>
    <a role="button" @click="handleClick" value="25" class="chip">
        <img src="public/images/chips/25.svg" />
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