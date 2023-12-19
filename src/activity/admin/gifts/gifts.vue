<template>
    <el-space wrap>
        <el-input placeholder="礼物ID" v-model.number="giftId" class="inp-width" />
        <el-input placeholder="礼物名称" v-model.number="giftName" class="inp-width" />
        <el-select v-model.number="giftTypeId" placeholder="礼物类型" class="inp-width">
            <el-option v-for="item in giftTypes" :key="item.giftTypeId" :label="item.giftTypeName"
                :value="item.giftTypeId" />
        </el-select>
        <el-select v-model.number="extendsId" placeholder="拓展类型" class="inp-width">
            <el-option v-for="item in giftTypeExtends" :key="item.extendsId" :label="item.extendsName"
                :value="item.extendsId" />
        </el-select>
        <el-select v-model.number="giftTagId" placeholder="礼物标签" class="inp-width">
            <el-option v-for="item in giftTags" :key="item.giftTagId" :label="item.giftTagName"
                :value="item.giftTagId" />
        </el-select>
        <el-space>
            <el-input placeholder="礼物价值(秀币)" v-model.number="minGiftVal" class="inp-width" />
            <el-text>-</el-text>
            <el-input placeholder="礼物价值(秀币)" v-model.number="maxGiftVal" class="inp-width" />
        </el-space>
        <el-input placeholder="指定房间Id" v-model.number="roomId" class="inp-width" />
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
    </el-space>
    <div class="table-opers">
        <el-space>
            <el-tag :type="multipleSelection.length ? 'success' : 'info'">已选中：{{ multipleSelection.length }}行</el-tag>
            <el-button type="warning" @click="cancelMultipleSelection" :disabled="!multipleSelection.length">取消选中</el-button>
            <el-button type="danger" :disabled="!multipleSelection.length">刪除选中</el-button>
            <el-button plain type="success">导入<span style="font-size: 12px;">(JSON)</span></el-button>
            <el-button plain type="warning">导出<span style="font-size: 12px;">(Excel)</span></el-button>
            <el-button type="success" @click="setAddVisible">添加<span style="font-size: 12px;">(单行)</span></el-button>
        </el-space>
    </div>
    <!-- align属性是无效的，这里用cell-style和header-cell-style处理 -->
    <el-table
        ref="multipleTableRef"
        :data="giftList"
        style="width: 100%;margin-top: 20px;"
        @selection-change="handleSelectionChange"
        :stripe="isStripe"
        :row-class-name="rowClassName"
        :row-key="rowKey"
        :cell-style="{textAlign: 'center'}"
        :header-cell-style="{textAlign: 'center'}"

    >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="giftId" label="礼物ID" width="100" />
        <el-table-column prop="giftName" label="礼物名称" width="140" />
        <el-table-column prop="giftType" label="礼物类型" width="90" />
        <el-table-column prop="extendsTypes" label="类型扩展" width="240">
            <template #default="et">
                <el-space>
                    <el-text v-for="v in et.row.extendsTypes">{{ v.extendsName }}</el-text>
                </el-space>
            </template>
        </el-table-column>
        <el-table-column prop="giftTags" label="礼物标签" width="240">
            <template #default="gt">
                <el-space>
                    <el-tag v-for="v in gt.row.giftTags" :type="(tags[v.giftTagId % tags.length] as any)">{{ v.giftTagName }}</el-tag>
                </el-space>
            </template>
        </el-table-column>
        <el-table-column prop="giftValue" label="礼物价值(秀币)" width="120">
            <template #default="gv">
                <el-text>{{ thousandFormat(gv.row.giftValue) }}</el-text>
            </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期">
            <template #default="cd">
                <el-text>{{ dayjs(cd.row.createDate).format("YYYY-MM-DD") }}</el-text>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination 
        background 
        layout="prev, pager, next, jumper, total, sizes" 
        :total="giftList.length" 
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :current-page="currentPage"
        @update:page-size="handlePageSize"
        @update:current-page="handleCurrentPage"
        hide-on-single-page
        style="margin-top: 12px;"
    />
    <AddDialog :isAddVisible="isAddVisible" @close="closeAdd" />
</template>

<style scoped lang="scss">
.table-opers {
    margin-top: 20px;
}
.inp-width {
    width: 120px;
}
/* table的row-class-name和stripe会有冲突，stripe默认会将偶数行添加背景色 */
/* 要使添加的类名起作用，需要使用:deep(类) */
.el-table :deep(.success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { giftTypes, giftTypeExtends, giftTags, giftList, tags } from './gifts-config'
import type { GiftResItem } from './gifts-config'
import { ElTable, dayjs } from 'element-plus'
import { thousandFormat } from '~/utils/thousandFormat';
import AddDialog from './add.vue'

const giftId = ref<number>()
const giftName = ref<string>("")
const giftTypeId = ref<number>()
const extendsId = ref<number>()
const giftTagId = ref<number>()
const minGiftVal = ref<number>()
const maxGiftVal = ref<number>()
const roomId = ref<number>()
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<GiftResItem[]>([])
const isStripe = ref<boolean>(true) /* row-class-name和stripe会有样式冲突，在有选中行时，我们让stripe属性改为false，这样能突出最终效果 */
const isAddVisible = ref<boolean>(false)

const setAddVisible = () => {
    isAddVisible.value = true
}
const closeAdd = () => {
    isAddVisible.value = false
}
const handleSelectionChange = (val: GiftResItem[]) => {
    multipleSelection.value = val
    isStripe.value = Boolean(!val.length)
}

const cancelMultipleSelection = () => {
    multipleTableRef.value!.clearSelection()
}

const rowClassName = ({ row }: { row: GiftResItem }): string => {
    if (multipleSelection.value.find(v => v.giftId === row.giftId)) {
        return 'success-row'
    }
    return ''
}

const rowKey = (row: GiftResItem): string => {
    if(!row || !row.giftId) return ''
    return row.giftId + ''
}

const handlePageSize = (val: number) => {
    // console.log('page size: ', val)
    pageSize.value = val
}
const handleCurrentPage = (val: number) => {
    // console.log('current page: ', val)
    currentPage.value = val
}
</script>