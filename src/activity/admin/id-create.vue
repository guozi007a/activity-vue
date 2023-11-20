<template>
    <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        :label-width="88"
        label-position="left"
    >
        <el-form-item label="ID:" prop="userId">
            <el-input v-model.number="form.userId" placeholder="请输入纯数字作为id" autofocus />
        </el-form-item>
        <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="用户名不少于6个字符" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickName">
            <el-input v-model="form.nickName" placeholder="用户昵称不超过12个字符" />
        </el-form-item>
        <el-form-item label="头像地址:" prop="avatar">
            <el-input v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password" placeholder="密码由8-20个字符组成，至少一个大写字母" show-password />
        </el-form-item>
        <el-form-item label="秀币余额:" prop="money">
            <el-input v-model.number="form.money" />
        </el-form-item>
        <el-form-item label="欢乐券:" prop="coupon">
            <el-input v-model.number="form.coupon" />
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
            <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="3">保密</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="身份类型:" prop="identity">
            <el-radio-group v-model="form.identity">
                <el-radio :label="1">用户</el-radio>
                <el-radio :label="2">普通主播</el-radio>
                <el-radio :label="3">情感厅房主</el-radio>
                <el-radio :label="4">情感厅普通主播</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="分区类型:" prop="talent">
            <el-radio-group v-model="form.talent">
                <el-radio :label="1">唱歌</el-radio>
                <el-radio :label="2">跳舞</el-radio>
                <el-radio :label="3">二次元</el-radio>
                <el-radio :label="4">搞笑</el-radio>
                <el-radio :label="5">无</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="公会ID: " prop="familyId">
            <el-input v-model.number="form.familyId" />
        </el-form-item>
        <el-form-item label="公会名称: " prop="familyName">
            <el-input v-model="form.familyName" />
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="form.birthday" :disabled-date="disabledDate" />
        </el-form-item>
        <el-form-item label="用户等级" prop="userLevel">
            <el-input v-model.number="form.userLevel" />
        </el-form-item>
        <el-form-item label="主播等级" prop="actorLevel">
            <el-input v-model.number="form.actorLevel" />
        </el-form-item>
        <el-form-item class="oper">
            <el-button type="primary" @click="handleSubmit(formRef)">生成账号</el-button>
            <el-button @click="handleReset(formRef)">重置表单</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.oper {
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'

interface FormConfig {
    userId: number
    username: string
    nickName: string
    avatar: string
    password: string
    money: number
    coupon: number
    gender: number
    identity: number
    userLevel: number
    actorLevel: number
    talent: number
    familyId: number
    familyName: string
    birthday: string
}

const now = new Date()

const initForm: FormConfig = {
    userId: 0,
    username: '',
    nickName: '',
    avatar: '',
    password: '',
    money: 0,
    coupon: 0,
    gender: 3,
    identity: 1, 
    userLevel: 0,
    actorLevel: 0,
    talent: 5,
    familyId: 10222,
    familyName: '星互娱',
    birthday: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
}


const formRef = ref<FormInstance>()
const form = reactive<FormConfig>(initForm)

const checkUsername = (_: any, value: any, callback: any) => {
    const reg = /[a-zA-Z_0-9-]/
    if (!reg.test(value)) {
        callback(new Error('用户名由字母、数字或_-字符组成'))
    } else {
        callback()
    }
}

const checkPassword = (_: any, value: any, callback: any) => {
    const reg = /[A-Z]+[a-z0-9_-]\.*/
    if (!reg.test(value)) {
        callback(new Error('密码必须有一个大写字母'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<FormConfig>>({
    userId: [
        { required: true, message: '用户id不能为空', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 6, message: '用户名不能少于6个字符', trigger: 'blur' },
        { validator: checkUsername, trigger: 'blur' },
    ],
    nickName: [
        { required: true, message: '用户昵称不能为空', trigger: 'blur' },
        { max: 12, message: '用户昵称不超过12个字符' },
    ],
    avatar: [],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 8, max: 20, message: '密码由8-20个字符组成', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur' },
    ],
    money: [
        { type: 'number', message: '秀币数值必须是数字', trigger: 'blur' },
    ],
    coupon: [
        { type: 'number', message: '欢乐券数值必须是数字', trigger: 'blur' },
    ],
    gender: [],
    identity: [],
    userLevel: [],
    actorLevel: [],
    talent: [],
    familyId: [
        { type: 'number', message: '公会Id必须是数字', trigger: 'blur' },
    ],
    familyName: [],
    birthday: [],
})

const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const handleReset = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.resetFields()
}

const disabledDate = (date: Date) => date.getTime() > now.getTime()
</script>