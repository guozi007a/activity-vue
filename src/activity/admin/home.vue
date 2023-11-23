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
                        <el-menu
                            :default-active="route.path"
                            class="menu" 
                            mode="vertical"
                            unique-opened
                            router
                        >
                            <el-menu-item index="/admin/dashboard">
                                <el-icon><icon-menu /></el-icon>
                                <span>主面板</span>
                            </el-menu-item>
                            <el-menu-item index="/admin/activity-add">
                                <el-icon><FirstAidKit /></el-icon>
                                <span>活动新增</span>
                            </el-menu-item>
                            <el-menu-item index="/admin/activity-list">
                                <el-icon><Grid /></el-icon>
                                <span>活动列表</span>
                            </el-menu-item>
                            <el-sub-menu index="/admin/id-manage">
                                <template #title>
                                    <el-icon><Operation /></el-icon>
                                    <span>账号管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/admin/id-manage/create"><el-icon><CirclePlus /></el-icon>新增账号</el-menu-item>
                                    <el-menu-item index="/admin/id-manage/search"><el-icon><Aim /></el-icon>账号查询</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-aside>
                    <el-container class="admin-content-wrap">
                        <el-main>
                            <el-scrollbar>
                                <router-view></router-view>
                            </el-scrollbar>
                        </el-main>
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
.admin-content-wrap {
    height: calc(100vh - 60px);
}
.menu {
    :deep(.el-menu-item-group__title) {
        display: none;
    }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useRoute } from 'vue-router'
import {
    Menu as IconMenu,
    Operation,
    CirclePlus,
    Aim,
    Grid,
    FirstAidKit
} from '@element-plus/icons-vue'

document.title = '活动管理后台'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const route = useRoute()
</script>