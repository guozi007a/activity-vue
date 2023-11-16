<template>
    <el-config-provider :locale="locale">
        <div class="common-layout">
            <el-container class="admin-wrap">
                <el-header>
                    <a href="https://www.kktv5.com/" class="logo-img">
                        <img src="https://rescdn.kktv8.com/kk-web-res/main/logo.png" alt="">
                    </a>
                </el-header>
                <el-container>
                    <el-aside>
                        <el-menu default-active="1" 
                            class="el-menu-vertical-demo" 
                            @open="handleOpen" 
                            @close="handleClose"
                            mode="vertical"
                            unique-opened
                        >
                            <el-menu-item index="1">
                                <el-icon><icon-menu /></el-icon>
                                <span>主面板</span>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <el-icon><Grid /></el-icon>
                                <span>活动列表</span>
                            </el-menu-item>
                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon><Operation /></el-icon>
                                    <span>账号管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="3-1"><el-icon><CirclePlus /></el-icon>新增账号</el-menu-item>
                                    <el-menu-item index="3-2"><el-icon><Aim /></el-icon>账号查询</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-aside>
                    <el-container>
                        <el-main>Main</el-main>
                        <el-footer>copyright@github.guozi007a 2023</el-footer>
                    </el-container>
                </el-container>
            </el-container>
        </div>
    </el-config-provider>
</template>

<style scoped lang="scss">
.el-container.admin-wrap {
    min-height: 100vh;
}

.el-header,
.el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.el-header {
    display: flex;
    align-items: center;

    .logo-img {
        width: 240px;
        box-sizing: border-box;
        padding-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 76px;
            height: 34px;
        }
    }
}

.el-aside {
    width: 260px;
    background-color: var(--el-color-primary-light-8);
    color: var(--el-text-color-primary);
}

.el-main {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
}

.el-footer {
    text-align: center;
    line-height: 60px;
    color: var(--el-color-info);
}
.el-menu {

    .el-menu-item {
        &.is-active {
            background-color: var(--el-menu-hover-bg-color);
        }
    }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import {
    Menu as IconMenu,
    Operation,
    CirclePlus,
    Aim,
    Grid
} from '@element-plus/icons-vue'

document.title = '活动管理后台'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>