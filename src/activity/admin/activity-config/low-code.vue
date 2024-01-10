<template>
    <el-container class="container" direction="vertical">
        <el-tabs 
            type="card"
            addable
            class="tabs"
            v-model="tabKey"
            @edit="editTab"
        >
            <el-tab-pane
                v-for="(v, _) in tabs"
                :key="v.name"
                :name="v.name"
            >
                <template #label>
                    <el-popover
                        trigger="contextmenu"
                        :visible="visiblePop?.name == v.name"
                    >
                        <template #default>
                            <el-space wrap>
                                <el-button type="primary" style="width: 120px;" @click="updateTab(v)">编辑tab名称</el-button>
                                <el-button type="danger" style="width: 120px;" @click="editTab(v.name, 'remove')">移除tab</el-button>
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
            </el-tab-pane>
        </el-tabs>
        <el-container class="low_code_wrap">
            <el-container class="low_code_container">
                <el-aside class="toolbars" style="width: 120px;">
                    <el-popover
                        title="盒子"
                        placement="right"
                    >
                        <template #reference>
                            <el-icon><Grid /></el-icon>
                        </template>
                        <template #default>
                            <span>普通盒子</span>
                        </template>
                    </el-popover>
                </el-aside>
                <el-main class="low_code_content">hello</el-main>
            </el-container>
            <el-footer style="line-height: 60px;">
                <el-button type="primary">保存画布</el-button>
                <el-button type="success">开始生成代码</el-button>
                <el-button type="primary">一键生成代码</el-button>
            </el-footer>
        </el-container>
    </el-container>
    <el-dialog
        title="新增Tab卡"
        v-model="addDialogVisible"
        @close="closeDialog"
        align-center
    >
        <el-input v-model="newTabName" placeholder="tab名称，如：play_2408_room" />
        <el-select v-model="tabCate" placeholder="选择tab类型" style="margin-top: 20px;">
            <el-option
                v-for="item in LOW_CATES"
                :key="item.lowId"
                :label="item.comment"
                :value="item.lowId"
            />
        </el-select>
        <template #footer>
            <el-container class="dialog_footer">
                <el-button type="primary" @click="confirmAdd">确认</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-container>
        </template>
    </el-dialog>
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
            user-select: none;
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
import { LOW_CATES } from './config'
import { Grid } from '@element-plus/icons-vue'

interface PaneConfig {
    title: string
    name: string
    lowId: number
}

const tabKey = ref('play_2408')
const tabs = ref<PaneConfig[]>([
    { title: "play_2408", name: "play_2408", lowId: 1 },
    { title: "play_2408_room", name: "play_2408_room", lowId: 3 },
])
const visiblePop = ref<PaneConfig | undefined>()
const addDialogVisible = ref(false)
const newTabName = ref('')
const tabCate = ref<number | undefined>()

const handleTabContextmenu = (v: PaneConfig) => {
    visiblePop.value = v
}

/* 用于解决点击非绑定元素时，无法关闭popover的问题 */
const onClickOutside = () => {
    visiblePop.value = undefined
}

/* 修改tab */
const updateTab = (v: PaneConfig) => {
    visiblePop.value = v
    addDialogVisible.value = true
    if (v) {
        newTabName.value = v.name
        tabCate.value = v.lowId
    }
    visiblePop.value = undefined
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
    } else if (action == 'add') {
        addDialogVisible.value = true
    }
}

/* 关闭dialog */
const closeDialog = () => {
    addDialogVisible.value = false
    newTabName.value = ''
    tabCate.value = undefined
}

/* 确认添加tab */
const confirmAdd = () => {
    if (newTabName.value && tabCate.value) {
        const item: PaneConfig = {
            title: newTabName.value,
            name: newTabName.value,
            lowId: tabCate.value,
        }
        tabs.value.push(item)
        closeDialog()
    } else {
        ElMessage.warning('必填项不能为空！')
    }
}
</script>