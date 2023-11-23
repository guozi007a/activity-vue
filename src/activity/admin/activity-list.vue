<template>
    <el-table :data="activityList" stripe :row-key="setRowKey">
        <el-table-column label="编号" :width="100">
            <template #default="sort">
                <span>{{ sort.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="branch" label="活动分支">
            <template #header>
                <span>活动分支</span>
                <el-popover
                    placement="bottom"
                    trigger="click"
                    width="auto"
                    @show="popFocus"
                    @after-leave="clearText"
                    :visible="popVisible"
                >
                    <template #reference>
                        <el-icon class="search-icon" title="搜索分支" @click="(e) => {popVisible = true; e.stopPropagation()}"><Search /></el-icon>
                    </template>
                    <!-- <slot name="reference"> -->
                        <div class="pop-wrap">
                            <el-input v-model="text" ref="inpRef" />
                            <div class="pop-search-container">
                                <el-icon class="pop-search" @click="handleSearch(text)"><Search /></el-icon>
                            </div>
                        </div>
                    <!-- </slot> -->
                </el-popover>
            </template>
            <template #default="branch">
                <span>{{ branch.row.branch }}</span>
                <el-icon title="复制分支" class="copy-icon" @click="copy(branch.row.branch)">
                    <CopyDocument />
                </el-icon>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="tag" label="活动类型" :width="120">
            <template #default="type">
                <el-tag>{{ type.row.tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="活动日期" :width="240">
            <template #default="date">
                <span class="date-cell">{{ date.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="oper">
                <el-space wrap>
                    <el-button type="primary" size="small">
                        <a :href="'/activity_/' + oper.row.url" target="_blank" style="color: #fff;">去活动页</a>
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(oper.row.branch)">删除分支</el-button>
                </el-space>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrap">
        <el-pagination 
            background 
            layout="prev, pager, next, jumper, total, sizes" 
            :total="total" 
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :current-page="currentPage"
            @update:page-size="handlePageSize"
            @update:current-page="handleCurrentPage"
            hide-on-single-page
        />
    </div>
</template>

<style scoped lang="scss">
.copy-icon {
    cursor: pointer;
    margin-left: 5px;
    vertical-align: middle;

    &:hover {
        color: #409eff;
    }
}
.date-cell {
    font-size: 12px;
}
.search-icon {
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
        color: #409eff;
    }
}
.pop-wrap {
    width: 150px;
    height: 32px;
    display: flex;
    align-items: center;

    .el-input {
        flex: auto;
        height: 100%;
        /* 使用:deep语法进行样式覆盖 */
        :deep(.el-input__wrapper) {
            box-sizing: border-box;
            border-radius: 4px 0 0 4px;

            .el-input__inner {
                text-align: center;
            }
        }
    }
    .pop-search-container {
        flex-shrink: 0;
        width: 32px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #54a5f7;
        border-radius: 0 4px 4px 0;
        cursor: pointer;

        .pop-search {
            color: #fff;
        }
    }
}
.pagination-wrap {
    margin: 15px auto 0;
    display: flex;
    justify-content: center;
}
</style>
  
<script lang="ts" setup>
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { getActivityListAPI, getActivityByBranchAPI, removeActivityAPI } from '~/api/admin';
import {
    CopyDocument,
    Search,
} from '@element-plus/icons-vue';
import { onMounted } from 'vue';

interface RowConfig<T> {
    id: number
    branch: T
    name: T
    tag: T
    date: T
    url: T
    createDate: number
}

const inpRef = ref<any>()
const text = ref<string>('')
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)
const activityList = ref<RowConfig<string>[]>([])
const total = ref<number>(0)
const popVisible = ref<boolean>(false)

const setRowKey = (row: RowConfig<string>): string => row.branch

const { toClipboard } = useClipboard()
const copy = async (text: string) => {
    try {
        await toClipboard(text)
        ElMessage.success('复制成功')
    } catch (e) {
        ElMessage.error('复制失败')
    }
}

const popFocus = () => {
    inpRef.value && inpRef.value.focus()
}
const clearText = () => text.value = ''

const handlePageSize = (val: number) => {
    // console.log('page size: ', val)
    pageSize.value = val
}
const handleCurrentPage = (val: number) => {
    // console.log('current page: ', val)
    currentPage.value = val
}

const getTableList = async (pageSize: number, page: number) => {
    const res = await getActivityListAPI(pageSize, page)
    if (res.code == "0") {
        activityList.value = res.data.list
        total.value = res.data.total
    } else {
        ElMessage.error(res.message)
    }
}
onMounted(() => {
    getTableList(pageSize.value, currentPage.value)
})

const handleSearch = async (branch: string) => {
    if (!branch) {
        ElMessage.warning('搜索分支不能为空')
        return
    }
    popVisible.value = false
    const res = await getActivityByBranchAPI(branch)
    if (res.code == "0") {
        activityList.value = res.data.list
        total.value = res.data.total
    } else {
        ElMessage.error(res.message)
    }
}
document.addEventListener('click', () => {
    popVisible.value = false
})
// 支持Enter
window.addEventListener('keyup', (e: KeyboardEvent) => {
    // 这里需要注意组件库和原生的区别
    // 原生是直接做对比 document.activeElement == inpRef.value
    // 组件库需要对比的是里面的ref属性 document.activeElement == inpRef.value.ref 或者
    // document.activeElement == inpRef.value.input
    // 此时在声明ref时，需要设置为any，即const inpRef = ref<any>()
    e.key == 'Enter' && inpRef.value && document.activeElement == inpRef.value.input && handleSearch(text.value)
})
const handleDelete = async (branch: string) => {
    const res = await removeActivityAPI(branch)
    if (res.code == "0") {
        activityList.value = activityList.value.filter(v => v.branch != branch)
        total.value = total.value - 1
        ElMessage.success('分支已删除')
    } else {
        ElMessage.error(res.message)
    }
}
</script>
  