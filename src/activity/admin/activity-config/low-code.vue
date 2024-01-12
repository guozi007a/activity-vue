<template>
    <el-container class="container" direction="vertical">
        <el-tabs 
            type="card"
            addable
            class="tabs"
            v-model="tabKey.name"
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
                <el-aside class="toolbars" style="width: 180px;">
                    <el-header style="height: 30px;text-align: center;line-height: 30px;">
                        <el-text style="font-weight: bold;font-size: 18px;">工具栏</el-text>
                    </el-header>
                    <el-tabs type="border-card">
                        <el-tab-pane
                            v-for="v in TOOLBAR_CONFIG"
                            :label="v.cate"
                            :key="v.cateId"
                        >
                            <template #default>
                                <el-space wrap>
                                    <template v-for="t in v.soup">
                                        <el-popover 
                                            :disabled="!t.stuff || t.stuff.length == 0" 
                                            placement="right"
                                            trigger="click"
                                        >
                                            <template #reference>
                                                <el-button @click="meterialKey = t.meterialId">{{ t.meterial }}</el-button>
                                            </template>
                                            <template #default>
                                                <el-space wrap>
                                                    <el-button 
                                                        v-for="s in t.stuff" 
                                                        type="success"
                                                        :key="s.foodId"
                                                        style="width: 120px;"
                                                        plain
                                                        @click="stuffKey = s.foodId"
                                                    >{{ s.food }}</el-button>
                                                </el-space>
                                            </template>
                                        </el-popover>
                                    </template>
                                </el-space>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </el-aside>
                <el-main class="low_code_content">
                    <el-container class="lc_context_wrap">
                        <el-container class="lc_context" :class="`lc_context${tabKey.lowId}`">hello</el-container>
                    </el-container>
                </el-main>
                <el-aside style="width: 220px;">
                    <el-header style="height: 30px;text-align: center;line-height: 30px;">
                        <el-text style="font-weight: bold;font-size: 18px;">样式调参</el-text>
                    </el-header>
                    <el-container style="background-color: var(--el-fill-color-light);">
                        <el-container v-if="meterialKey == 300">
                            <el-header style="margin-top: 5px;">
                                指定父图层：<el-input style="margin-top: 5px;" />
                            </el-header>
                            <el-footer style="line-height: 60px;">
                                <el-button type="primary">确定</el-button>
                            </el-footer>
                        </el-container>
                        <el-container v-else-if="stuffKey == 40001">
                            <el-container class="handler"></el-container>
                            <el-container class="faster"></el-container>
                        </el-container>
                    </el-container>
                </el-aside>
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

    .low_code_wrap {
        user-select: none;

        .low_code_content {
            position: relative;
            height: 666px;

            .lc_context_wrap {
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px solid var(--el-border-color);
                overflow: hidden;

                .lc_context {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;

                    &.lc_context1 {
                        width: 1920px;
                    }

                    &.lc_context2 {
                        width: 1080px;
                    }

                    &.lc_context3 {
                        width: 400px;
                        height: 80px;
                    }

                    &.lc_context4 {
                        width: 158px;
                        height: 398px;
                    }

                    &.lc_context5 {
                        width: 1080px;
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import type { TabPaneName } from 'element-plus'
import { LOW_CATES, TOOLBAR_CONFIG } from './config'

interface PaneConfig {
    title: string
    name: string
    lowId: number
}

const tabs = ref<PaneConfig[]>([
    { title: "play_2408", name: "play_2408", lowId: 1 },
    { title: "play_2408_room", name: "play_2408_room", lowId: 3 },
])
const tabKey = ref<PaneConfig>(tabs.value[0])
const visiblePop = ref<PaneConfig | undefined>()
const addDialogVisible = ref(false)
const newTabName = ref('')
const tabCate = ref<number | undefined>()
const meterialKey = ref<number | undefined>()
const stuffKey = ref<number | undefined>()

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
            if (tabKey.value?.name == paneName) {
                tabs.value.forEach((v, i) => {
                    if (v.name == paneName) {
                        tabKey.value = tabs.value[i + 1] || tabs.value[i - 1]
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