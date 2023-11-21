<template>
    <Transition name="login">
        <div class="login-wrap" v-if="loginStore.visible">
            <div class="login-mask" @click="loginStore.close()"></div>
        <div class="login-container"></div>
    </div>
    </Transition>
</template>

<style scoped lang="scss">
.login-wrap {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s;
    .login-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        transition: all .5s;
    }
    .login-container {
        position: relative;
        width: 400px;
        height: 500px;
        background-color: #fff;
        border-radius: 14px;
        box-sizing: border-box;
        transition: all .3s;
    }
}
.login-enter-from {
    width: 0;
    height: 0;
    opacity: 0;
    .login-container {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
.login-leave-to {
    width: 0;
    height: 0;
    opacity: 0;
    .login-container {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
</style>

<script setup lang="ts">
import { useLoginStore } from '~/store/useLoginStore';

const loginStore = useLoginStore()
</script>