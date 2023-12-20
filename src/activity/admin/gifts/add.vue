<template>
    <!-- [Vue warn] Set operation on key "isAddVisible" failed: target is readonly -->
    <!-- 解决方法：将v-model="isAddVisible"改为:model-value="isAddVisible" -->
    <el-dialog :model-value="isAddVisible" title="添加礼物" width="30%" center align-center style="min-width: 460px;" @close="closeDialog(ruleFormRef)">
        <el-form
            ref="ruleFormRef"
            :model="formReq"
            label-position="left"
            label-width="80"
            :rules="rules"
        >
            <el-form-item prop="giftId" label="礼物ID">
                <el-input v-model.number="formReq.giftId" />
            </el-form-item>
            <el-form-item prop="giftName" label="礼物名称">
                <el-input v-model="formReq.giftName" />
            </el-form-item>
            <el-form-item prop="giftTypeId" label="礼物类型">
                <el-select v-model="formReq.giftTypeId" placeholder="请选择">
                    <el-option
                        v-for="v in giftTypes"
                        :key="v.giftTypeId"
                        :label="v.giftTypeName"
                        :value="v.giftTypeId"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="extendsTypes" label="类型拓展">
                <el-checkbox-group v-model="formReq.extendsTypes">
                    <el-checkbox v-for="v in giftTypeExtends" :label="v.extendsName" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="giftTags" label="礼物标签">
                <el-checkbox-group v-model="formReq.giftTags">
                    <el-checkbox v-for="v in giftTags" :label="v.giftTagName" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="giftValue" label="礼物价值">
                <el-input v-model.number="formReq.giftValue" placeholder="(秀币金额)" />
            </el-form-item>
            <el-form-item prop="cornerMarkId" label="礼物角标">
                <el-select v-model="formReq.cornerMarkId" placeholder="请选择">
                    <el-option
                        v-for="v in cornerMarks"
                        :key="v.cornerMarkId"
                        :label="v.cornerMarkName"
                        :value="v.cornerMarkId"
                    >
                        <el-space>
                            <el-text style="min-width: 80px;">{{ v.cornerMarkName }}</el-text>
                            <el-image v-if="v.cornerMarkId" style="width: 35px" fit="contain" :src="giftIcon(v.cornerMarkId)" />
                            <el-text v-else>-</el-text>
                        </el-space>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="giftDescribe" label="礼物描述">
                <el-input v-model="formReq.giftDescribe" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                <el-button type="warning" @click="resetForm(ruleFormRef)">重置</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { giftTypes, giftTypeExtends, giftTags, cornerMarks } from './gifts-config'
import type { GiftResItem } from './gifts-config'
import { giftIcon } from '~/utils/commonUtils'

interface PropType {
    isAddVisible?: boolean
}

defineProps<PropType>()

const emits = defineEmits(['close'])

const closeDialog = (formEl: FormInstance | undefined) => {
    resetForm(formEl)
    emits('close', false)
}

interface FormConfig {
    giftId: number | undefined
    giftName: string
    giftTypeId: number | undefined
    extendsTypes: string[]
    giftTags: string[]
    giftValue: number | undefined
    giftDescribe: string
    cornerMarkId: number | undefined
    cornerMarkName: string
}

const initForm: FormConfig = {
    giftId: undefined,
    giftName: "",
    giftTypeId: undefined,
    extendsTypes: [],
    giftTags: [],
    giftValue: undefined,
    giftDescribe: "",
    cornerMarkId: undefined,
    cornerMarkName: "",
}

const ruleFormRef = ref<FormInstance>()

const formReq = reactive<FormConfig>(initForm)

const rules = reactive<FormRules<FormConfig>>({
    giftId: [{ type: 'number', required: true, message: 'Please input gift id, type: number', trigger: 'blur' }],
    giftName: [{ required: true, message: 'Please input gift name', trigger: 'blur' }],
    giftTypeId: [{ type: 'number', required: true, message: 'Please select gift type id', trigger: 'change' }],
    giftValue: [{ type: 'number', required: true, message: 'Please input gift value, type: number', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            // console.log('formReq: ', formReq)
            /* 转换成要提交的参数 */
            const params = {} as Omit<GiftResItem, "createDate">
            params.giftId = formReq.giftId!
            params.giftName = formReq.giftName
            params.giftTypeId = formReq.giftTypeId!
            params.giftType = giftTypes.find(v => v.giftTypeId == params.giftTypeId)?.giftTypeName!
            params.giftValue = formReq.giftValue!
            params.giftDescribe = formReq.giftDescribe
            params.extendsTypes = []
            params.giftTags = []
            if (formReq.extendsTypes.length !== 0) {
                formReq.extendsTypes.forEach(v => {
                    const item = giftTypeExtends.find(val => val.extendsName == v)!
                    params.extendsTypes.push(item)
                })
            }
            if (formReq.giftTags.length !== 0) {
                formReq.giftTags.forEach(v => {
                    const item = giftTags.find(val => val.giftTagName == v)!
                    params.giftTags.push(item)
                })
            }
            params.cornerMarkId = formReq.cornerMarkId ?? 0
            params.cornerMarkName = params.cornerMarkId ? cornerMarks.find(v => v.cornerMarkId == params.cornerMarkId)?.cornerMarkName ?? "" : ""
            // console.log('params: ', params)
        } else {
            ElMessage.warning('请按规则填写表单!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>