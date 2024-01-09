<template>
    <el-container class="container">
        <el-tabs 
            type="card"
            addable
            class="tabs"
            v-model="tabKey"
            @edit="editTab"
        >
            <el-tab-pane
                v-for="(v, i) in tabs"
                :key="v.name"
                :name="v.name"
            >
                <template #label>
                    <el-popover
                        :width="220"
                        trigger="contextmenu"
                        :visible="visiblePop?.name == v.name"
                    >
                        <template #default>
                            <el-space>
                                <el-button type="primary" @click="editTabName(v)">编辑tab名称</el-button>
                                <el-button type="danger" @click="editTab(v.name, 'remove')">移除tab</el-button>
                            </el-space>
                        </template>
                        <template #reference>
                            <p 
                                class="tab" 
                                @click.right.prevent="handleTabContextmenu(v)"
                                v-click-outside="onClickOutside"
                            >{{ v.title }}</p>
                        </template>
                    </el-popover>
                </template>
                <template #default>
                    <span>{{ v.title }} - {{ i }}</span>
                </template>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</template>

<style scoped lang="scss">
.container {
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;

    .tabs {
        width: 100%;

        .tab {
            height: 100%;
            line-height: 40px;
        }

        :deep(.el-icon.is-icon-close) { /* 隐藏tab自带的关闭icon，容易误触 */
            display: none;
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import type { TabPaneName } from 'element-plus'

interface PaneConfig {
    title: string
    name: string
}

const tabKey = ref('play_2408')
const tabs = ref<PaneConfig[]>([
    { title: "play_2408", name: "play_2408" },
    { title: "play_2408_room", name: "play_2408_room" },
])
const visiblePop = ref<PaneConfig>()

const handleTabContextmenu = (v: PaneConfig) => {
    visiblePop.value = v
}

/* 用于解决点击非绑定元素时，无法关闭popover的问题 */
const onClickOutside = () => {
    visiblePop.value = undefined
}

/* 编辑tab名称 */
const editTabName = (v: PaneConfig) => {
    visiblePop.value = v
}

/* 新增或移除tab */
const editTab = (paneName: TabPaneName | undefined, action: 'remove' | 'add') => {
    if (action == 'remove') {
        if (tabs.value.length <= 1) {
            tabs.value = []
        } else {
            if (tabKey.value == paneName) {
                tabs.value.forEach((v, i) => {
                    if (v.name == paneName) {
                        tabKey.value = tabs.value[i + 1]?.name || tabs.value[i - 1]?.name
                    }
                })
            }
            tabs.value = tabs.value.filter(item => item.name != paneName)
        }
    } else if (action == 'add') {}
}
</script>