<!-- 项目介绍 -->
<template>
    <p class="p1">本项目使用vue + vite开发，用于活动项目的案例测试</p>
    <p class="p2">输入活动编号，去往活动地址：</p>
    <div class="inp-wrap">
        <input type="text" autofocus class="inp" placeholder="4位数字，如2399" v-model="val" ref="inpRef">
        <a :href="`/activity_/play_${val}`" class="to-activity" @click="toActivity" ref="activityRef">GO</a>
    </div>
    <div class="admin-wrap">
        或者，你也可以<a href="/admin" class="to-admin">前往管理后台</a>进行活动配置。
    </div>
</template>

<style scoped lang="scss">
p {
    margin: auto;
    text-align: center;
    margin-top: 20px;
    user-select: none;
}
.inp-wrap {
    width: 240px;
    height: 32px;
    margin: auto;
    margin-top: 20px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    overflow: hidden;
    .inp {
        width: 180px;
        height: 100%;
        box-sizing: border-box;
        padding: 0 12px;
        text-align: center;
    }
    .to-activity {
        display: block;
        flex: auto;
        height: 100%;
        text-align: center;
        line-height: 32px;
        background-color: #409eff;
        color: #fff;
        user-select: none;
        cursor: pointer;
    }
}
.admin-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 12px;
    .to-admin {
        display: block;
        width: 120px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #409eff;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        transition: box-shadow .3s;

        &:hover {
            transition: box-shadow .3s;
            box-shadow: inset 0 0 10px 2px rgba(255, 255, 255, .3);
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';

const val = ref<string>('')
const activityRef = ref<HTMLLinkElement>()
const inpRef = ref<HTMLInputElement>()

const toActivity = (e: Event) => {
    const reg = /\d{4}/
    if (!reg.test(val.value)) {
        e.preventDefault()
        ElMessage.error('请输入正确的活动编号~')
    }
}

// 支持Enter
window.addEventListener('keyup', (e: KeyboardEvent) => {
    // 输入框获取到焦点时，按了回车键，会触发链接点击效果
    e.key == 'Enter' && inpRef.value && document.activeElement == inpRef.value && activityRef.value && activityRef.value.click()
})
</script>