<template>
    <el-form :model="form" :label-width="120" label-position="left" :rules="rules" ref="formRef">
        <el-form-item label="活动分支" prop="branch">
            <el-input v-model="form.branch" placeholder="例: play_2399" autofocus />
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name" placeholder="例: 感恩节活动" />
        </el-form-item>
        <el-form-item label="活动类型" prop="tag">
            <el-select v-model="form.tag" placeholder="请选择">
                <el-option label="临时活动" value="临时活动" />
                <el-option label="节日活动" value="节日活动" />
                <el-option label="长期活动" value="长期活动" />
                <el-option label="专属活动" value="专属活动" />
            </el-select>
        </el-form-item>
        <el-form-item label="活动地址" prop="url">
            <el-input v-model="form.url" placeholder="用于跳转到活动页，一般和分支名相同，如play_2399" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="dateStart">
            <el-date-picker v-model="form.dateStart" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="如2023-12-06 11:00:00" />
        </el-form-item>
        <el-form-item label="活动结束时间" prop="dateEnd">
            <el-date-picker v-model="form.dateEnd" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="如2023-12-06 00:00:00" />
        </el-form-item>
        <el-form-item label="模块开始时间" prop="moudleStart">
            <el-date-picker v-model="form.moudleStart" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="如2023-12-06 11:00:00" />
        </el-form-item>
        <el-form-item label="模块结束时间" prop="moudleEnd">
            <el-date-picker v-model="form.moudleEnd" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="如2023-12-06 00:00:00" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit(formRef)">提交</el-button>
            <el-button @click="handleReset(formRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { AddActivityFormConfig } from './id-types'
import { addActivityAPI } from '~/api/admin'

const initForm: AddActivityFormConfig = {
    branch: '',
    name: '',
    tag: '',
    url: '',
    dateStart: '',
    dateEnd: '',
    moudleStart: '',
    moudleEnd: '',
}

const form = reactive<AddActivityFormConfig>(initForm)
const formRef = ref<FormInstance>()

const rules = reactive<FormRules<AddActivityFormConfig>>({
    branch: [{ required: true, message: '不能为空', trigger: 'blur' }],
    name: [{ required: true, message: '不能为空', trigger: 'blur' }],
    tag: [{ required: true, message: '不能为空', trigger: 'blur' }],
    url: [{ required: true, message: '不能为空', trigger: 'blur' }],
    dateStart: [{ required: true, message: '不能为空', trigger: 'blur' }],
    dateEnd: [{ required: true, message: '不能为空', trigger: 'blur' }],
})

const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const res = await addActivityAPI(form)
            if (res.code == "0") {
                ElMessage.success('新增活动成功')
                handleReset(formEl)
            } else {
                ElMessage.error(res.message)
            }
        }
    })
}

const handleReset = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.resetFields()
}
</script>