<template>
    <main class="wrap">
        <el-space>
            <el-input 
                placeholder="充值id"
                v-model.number="userId"
            />
            <el-input 
                placeholder="支付id"
                v-model.number="payId"
            />
            <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
            />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="init">重置</el-button>
        </el-space>
        <div class="main" v-if="logs && logs.length">
            <div class="container">
                <el-scrollbar>
                    <div class="log" v-for="v in logs" :key="v.id">
                        <el-space class="space">
                            <span class="circle">{{ v.id }}</span>
                            <p class="text">
                                <el-text v-if="v.payId && v.payNick">
                                    <el-text type="danger">{{ v.payNick }}</el-text>
                                    (<el-text type="warning">{{ v.payId }}</el-text>)
                                    给
                                </el-text>
                                <el-text type="success">{{ v.nickName }}</el-text>
                                (<el-text type="primary">{{ v.userId }}</el-text>)
                                在
                                <el-text type="warning">[{{ dayjs(v.date).format("YYYY-MM-DD HH:mm:ss") }}]</el-text>
                                充值了
                                <el-text type="danger">[{{ thousandFormat(v.money || v.coupon) }}]</el-text>
                                <el-text type="warning">&nbsp;{{ v.money ? '秀币' : '欢乐券' }}</el-text>
                            </p>
                            <el-button type="danger" size="small" class="del" @click="handleDel(v.id)">删除</el-button>
                        </el-space>
                    </div>
                    <el-pagination 
                        background
                        :page-size="pageSize"
                        :total="total"
                        :current-page="page"
                        layout="prev, pager, next, jumper, ->, total"
                        @update:current-page="handleCurrentPage"
                        hide-on-single-page
                    />
                </el-scrollbar>
            </div>
        </div>
        <el-empty v-else />
    </main>
</template>

<style scoped lang="scss">
.wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main {
        flex: auto;
        box-sizing: border-box;
        padding: 12px 0;
        .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .log {
                height: 24px;
                margin-top: 6px;
                &:nth-child(1) {
                    margin-top: 0;
                }
                .space {
                    height: 100%;
                    .circle {
                        display: inline-block;
                        vertical-align: top;
                        min-width: 24px;
                        height: 24px;
                        text-align: center;
                        line-height: 24px;
                        box-sizing: border-box;
                        padding: 0 6px;
                        border-radius: 12px;
                        background-color: #fff;
                        color: gray;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .del {
                        display: none;
                    }
                    &:hover {
                        .del {
                            display: inline-flex;
                        }
                    }
                }
            }
            .el-pagination {
                margin-top: 10px;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getChargeLogsAPI, delChargeLogAPI } from '~/api/admin';
import type { ChargeLogsConfig } from '~/api/admin'
import { thousandFormat } from '~/utils/thousandFormat'
import { dayjs } from 'element-plus' // element-plus默认支持dayjs，可以直接引入并使用

interface LogConfig {
    id: number
    userId: number
    payId: number
    nickName: string
    payNick: string
    money: number
    coupon: number
    date: number
}

const userId = ref<number | undefined>()
const payId = ref<number | undefined>()
const date = ref<[string, string]>(['', ''])
const page = ref<number>(1)
const pageSize = ref<number>(50)
const logs = ref<LogConfig[]>([])
const total = ref<number>(0)

const init = () => {
    userId.value = undefined
    payId.value = undefined
    date.value = ['', '']
}

const handleCurrentPage = (val: number) => {
    page.value = val
}

const search = async () => {
    const params: ChargeLogsConfig = { page: page.value, pageSize: pageSize.value }
    userId && (params.userId = userId.value)
    payId && (params.payId = payId.value)
    if (date.value && date.value.length > 0) {
        date.value[0] && (params.dateStart = new Date(date.value[0]).getTime())
        date.value[1] && (params.dateEnd = new Date(date.value[1]).getTime() + 24 * 60 * 60 * 1000)
    }
    const res = await getChargeLogsAPI(params)
    if (res.code == "0") {
        logs.value = res.data.chargeList
        total.value = res.data.total
    } else {
        ElMessage.error(res.message)
    }
}

const handleDel = async (id: number) => {
    if (!id) {
        ElMessage.warning('缺少必要参数')
        return
    }
    const res = await delChargeLogAPI(id)
    if (res.code === '0') {
        ElMessage.success('删除成功')
        logs.value = logs.value.filter((v => v.id != id))
    } else {
        ElMessage.error(res.message)
    }
}

onMounted(() => {
    search()
})
</script>