<template>
    <el-table :data="tableList" stripe :row-key="setRowKey">
        <el-table-column label="编号">
            <template #default="sort">
                <span>{{ sort.$index + 1 + '_' + currentPage }}</span>
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
                >
                    <template #reference>
                        <el-icon class="search-icon" title="搜索分支"><Search /></el-icon>
                    </template>
                    <!-- <slot name="reference"> -->
                        <div class="pop-wrap">
                            <el-input v-model="text" ref="inpRef" />
                            <div class="pop-search-container">
                                <el-icon class="pop-search"><Search /></el-icon>
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
        <el-table-column prop="tag" label="活动类型">
            <template #default="type">
                <el-tag>{{ type.row.tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="活动日期">
            <template #default="date">
                <span class="date-cell">{{ date.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="oper">
                <el-button type="primary" size="small">
                    <a :href="oper.row.url" target="_blank" style="color: #fff;">去活动页</a>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrap">
        <el-pagination 
            background 
            layout="prev, pager, next, jumper, total, sizes" 
            :total="tableData.length" 
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
import { ref, computed } from 'vue'
import useClipboard from 'vue-clipboard3'
import {
    CopyDocument,
    Search,
} from '@element-plus/icons-vue';

const inpRef = ref<HTMLInputElement>()
const text = ref<string>('')
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)

interface RowConfig<T> {
    branch: T
    name: T
    tag: T
    date: T
    url: T
}
const tableData: RowConfig<string>[] = new Array(202).fill(
    {
        branch: 'play_2399',
        name: '感恩节回馈',
        tag: '节日活动',
        date: '11月23日 11:00 - 11月26日 24:00',
        url: '/activity_/play_2399',
    }
)

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
const tableList = computed(() => tableData.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
</script>
  