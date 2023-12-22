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
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
    </el-space>
    <div class="table-opers">
        <el-space>
            <el-tag :type="multipleSelection.length ? 'success' : 'info'">已选中：{{ multipleSelection.length }}行</el-tag>
            <el-button type="warning" @click="cancelMultipleSelection" :disabled="!multipleSelection.length">取消选中</el-button>
            <el-button type="danger" :disabled="!multipleSelection.length" @click="removeGifts">刪除选中</el-button>
            <el-button plain type="success">导入<span style="font-size: 12px;">(JSON)</span></el-button>
            <el-button plain type="warning">导出<span style="font-size: 12px;">(Excel)</span></el-button>
            <el-button type="success" @click="setAddVisible">添加<span style="font-size: 12px;">(单行)</span></el-button>
            <el-button plain type="danger" :disabled="multipleSelection.length != 1" @click="update">修改<span style="font-size: 12px;">(单行)</span></el-button>
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
        <el-table-column prop="cornerMarkId" label="礼物角标" width="100">
            <template #default="cm">
                <el-image style="width: 42px" :src="giftIcon(cm.row.cornerMarkId)" fit="contain" />
            </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="120">
            <template #default="cd">
                <el-text>{{ dayjs(cd.row.createDate).format("YYYY-MM-DD") }}</el-text>
            </template>
        </el-table-column>
    </el-table>
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
        style="margin-top: 12px;"
    />
    <AddDialog :isAddVisible="isAddVisible" @close="closeAdd" :updateInfo="updateInfo" />
</template>

<style scoped lang="scss">
.table-opers {
    margin-top: 20px;
    position: sticky;
    z-index: 5;
    top: 0;
    left: 0;
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
import { ref, onMounted } from 'vue';
import { giftTypes, giftTypeExtends, giftTags, tags } from './gifts-config'
import type { GiftResItem } from './gifts-config'
import { type ElTable, dayjs } from 'element-plus' /* 引入时加上type，避免手动引入和自动引入的冲突，冲突时会导致组件样式无法自动加载 */
import { thousandFormat } from '~/utils/thousandFormat';
import AddDialog from './add.vue'
import { giftIcon } from "~/utils/commonUtils"
import { queryGiftsAPI, type QueryGiftsParams, delGiftsAPI, type DelGiftsParams } from '~/api/admin';

const giftId = ref<number>()
const giftName = ref<string>("")
const giftTypeId = ref<number>()
const extendsId = ref<number>()
const giftTagId = ref<number>()
const minGiftVal = ref<number>()
const maxGiftVal = ref<number>()
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<GiftResItem[]>([])
const isStripe = ref<boolean>(true) /* row-class-name和stripe会有样式冲突，在有选中行时，我们让stripe属性改为false，这样能突出最终效果 */
const isAddVisible = ref<boolean>(false)
const giftList = ref<GiftResItem[]>([])
const total = ref<number>(0)
const updateInfo = ref<GiftResItem>()

const setAddVisible = () => {
    isAddVisible.value = true
}
const closeAdd = () => {
    isAddVisible.value = false
    updateInfo.value = undefined
    multipleSelection.value.length && cancelMultipleSelection()
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

const search = async () => {
    const params = {} as QueryGiftsParams
    params.giftId = giftId.value ?? 0
    params.giftName = giftName.value
    params.extendsId = extendsId.value ?? 0
    params.giftTypeId = giftTypeId.value ?? 0
    params.giftTagId = giftTagId.value ?? 0
    params.minGiftValue = minGiftVal.value ?? 0
    params.maxGiftValue = maxGiftVal.value ?? 0
    params.page = currentPage.value
    params.pageSize = pageSize.value
    const res = await queryGiftsAPI(params)
    if (res.code == "0") {
        giftList.value = res.data.giftList
        total.value = res.data.total
    } else {
        ElMessage.error(res.message)
    }
}

const resetSearch = () => {
    giftId.value = undefined
    giftName.value = ""
    extendsId.value = undefined
    giftTypeId.value = undefined    
    extendsId.value = undefined
    giftTagId.value = undefined
    minGiftVal.value = undefined
    maxGiftVal.value = undefined
}

onMounted(() => {
    search()
})

const update = () => {
    // console.log('选中项：', multipleSelection.value[0])
    updateInfo.value = multipleSelection.value[0]
    setAddVisible()
}

const removeGifts = async () => {
    const ids = multipleSelection.value.map(v => v.giftId)
    const params: DelGiftsParams = { ids }
    const res = await delGiftsAPI(params)
    if (res.code == "0") {
        ElMessage.success('删除成功！')
        giftList.value = giftList.value.filter(v => multipleSelection.value.find(item => item.giftId != v.giftId))
        cancelMultipleSelection()
    } else {
        ElMessage.error(res.message)
    }
}
</script>