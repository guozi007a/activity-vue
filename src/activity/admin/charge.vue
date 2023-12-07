<template>
    <el-space>
        <el-input 
            placeholder="充值id"
            v-model.number="userId"
        />
        <el-select
            v-model="type"
            placeholder="充值类型"
        >
            <el-option label="秀币" value="money" />
            <el-option label="欢乐券" value="coupon" />
        </el-select>
        <el-input placeholder="充值金额(元)" v-model.number="val" />
        <el-button type="primary" @click="charge">充值</el-button>
        <el-button type="primary" @click="init">重置</el-button>
    </el-space>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';
import { chargeAPI } from '~/api/admin'
import type { ChargeConfig } from '~/api/admin'

const exp = /^\d+$/

const userId = ref<number | undefined>()
const type = ref<string>('')
const val = ref<number | undefined>()

const init = () => {
    userId.value = undefined
    type.value = ''
    val.value = undefined
}

const charge = async () => {
    if (!userId.value) {
        ElMessage.warning('用户id不能为空')
        return
    }
    if (!exp.test(userId.value + '')) {
        ElMessage.warning('用户id格式错误')
        return
    }
    if (!type.value) {
        ElMessage.warning('充值类型不能为空')
        return
    }
    if (!val.value) {
        ElMessage.warning('充值金额不能为空')
        return
    }
    if (!exp.test(val.value + '')) {
        ElMessage.warning('充值金额格式错误')
        return
    }
    const params: ChargeConfig = {
        userId: userId.value,
        type: type.value,
        count: val.value,
    }

    const res = await chargeAPI(params)
    if (res.code == "0") {
        ElMessage.success('充值成功')
        init()
    } else {
        ElMessage.error(res.message)
    }
}
</script>