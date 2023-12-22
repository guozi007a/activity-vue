<template>
    <!-- [Vue warn] Set operation on key "isAddVisible" failed: target is readonly -->
    <!-- 解决方法：将v-model="isAddVisible"改为:model-value="isAddVisible" -->
    <el-dialog 
        :model-value="isAddVisible" 
        title="添加礼物" 
        width="30%" 
        center 
        align-center 
        style="min-width: 460px;" 
        @open="handleOpen" 
        @close="closeDialog(ruleFormRef)"
    >
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
            <el-form-item prop="giftValue" label="礼物价值">
                <el-input v-model.number="formReq.giftValue" placeholder="(秀币金额)" />
            </el-form-item>
            <el-form-item prop="extendsTypes" label="类型拓展">
                <!-- 可多选时，value-key属性用来告诉选择框用哪个属性来做区分 -->
                <el-select
                    v-model="formReq.extendsTypes"
                    multiple
                    value-key="extendsId"
                    placeholder="请选择(可多选)"
                    style="width: 100%;"
                >
                    <el-option
                        v-for="item in giftTypeExtends"
                        :key="item.extendsId"
                        :label="item.extendsName"
                        :value="{giftId: formReq.giftId, ...item}"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="giftTags" label="礼物标签">
                <el-select
                    v-model="formReq.giftTags"
                    multiple
                    value-key="giftTagId"
                    placeholder="请选择(可多选)"
                    style="width: 100%;"
                >
                    <el-option
                        v-for="item in giftTags"
                        :key="item.giftTagId"
                        :label="item.giftTagName"
                        :value="{giftId: formReq.giftId, ...item}"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="cornerMarkId" label="礼物角标">
                <el-space>
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
                    <el-image v-if="formReq.cornerMarkId" style="width: 35px;" :src="giftIcon(formReq.cornerMarkId)" fit="contain" />
                </el-space>
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
import { addGiftAPI, updateGiftAPI } from '~/api/admin'

interface PropType {
    isAddVisible?: boolean
    updateInfo?: GiftResItem
}

const props = defineProps<PropType>()

const emits = defineEmits(['close'])

const closeDialog = (formEl: FormInstance | undefined) => {
    resetForm(formEl)
    emits('close', false)
}

const initForm = {} as GiftResItem

const ruleFormRef = ref<FormInstance>()

const formReq = reactive<GiftResItem>(initForm)

const rules = reactive<FormRules<GiftResItem>>({
    giftId: [{ type: 'number', required: true, message: 'Please input gift id, type: number', trigger: 'blur' }],
    giftName: [{ required: true, message: 'Please input gift name', trigger: 'blur' }],
    giftTypeId: [{ type: 'number', required: true, message: 'Please select gift type id', trigger: 'change' }],
    giftValue: [{ type: 'number', required: true, message: 'Please input gift value, type: number', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // console.log('formReq: ', formReq)
    await formEl.validate(async (valid) => {
        if (valid) {
            /* 转换成要提交的参数 */
            const params = {} as GiftResItem
            params.giftId = formReq.giftId
            params.giftName = formReq.giftName
            params.giftTypeId = formReq.giftTypeId
            params.giftType = giftTypes.find(v => v.giftTypeId == params.giftTypeId)?.giftTypeName!
            params.giftValue = formReq.giftValue
            params.giftDescribe = formReq.giftDescribe
            params.extendsTypes = formReq.extendsTypes.length ? formReq.extendsTypes.map(v => typeof v == "number" ? giftTypeExtends.find(item => item.extendsId == v)! : v) : []
            params.giftTags = formReq.giftTags.length ? formReq.giftTags.map(v => typeof v == "number" ? giftTags.find(item => item.giftTagId == v)! : v) : []
            params.cornerMarkId = formReq.cornerMarkId ?? 0
            params.cornerMarkName = params.cornerMarkId ? cornerMarks.find(v => v.cornerMarkId == params.cornerMarkId)?.cornerMarkName ?? "" : ""
            // console.log('params: ', params)

            if (props.updateInfo) { /* 更新 */
                const res = await updateGiftAPI(params)
                if (res.code == "0") {
                    ElMessage.success('修改成功!')
                    closeDialog(formEl)
                } else {
                    ElMessage.error(res.message)
                }
            } else { /* 新增 */
                const res = await addGiftAPI(params)
                if (res.code == "0") {
                    ElMessage.success('添加成功!')
                    resetForm(formEl)
                } else {
                    ElMessage.error(res.message)
                }
            }
        } else {
            ElMessage.warning('请按规则填写表单!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const handleOpen = () => {
    // console.log('updateInfo: ', props.updateInfo)
    if (props.updateInfo) {
        const pu = props.updateInfo
        formReq.giftId = pu.giftId
        formReq.giftName = pu.giftName
        formReq.giftTypeId = pu.giftTypeId
        formReq.extendsTypes = pu.extendsTypes
        formReq.giftTags = pu.giftTags
        formReq.giftValue = pu.giftValue
        formReq.giftDescribe = pu.giftDescribe
        formReq.cornerMarkId = pu.cornerMarkId
        formReq.cornerMarkName = pu.cornerMarkName
    }
}
</script>