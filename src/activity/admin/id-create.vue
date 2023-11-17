<template>
    <el-form
        :model="form"
    >
        <el-form-item label="ID：">
            <el-input v-model="form.userId" placeholder="请输入纯数字作为id" autofocus />
        </el-form-item>
        <el-form-item label="昵称：">
            <el-input v-model="form.nickName" :maxlength="12" />
        </el-form-item>
        <el-form-item label="头像地址：">
            <el-input v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="密码：">
            <el-input v-model="form.password" :minlength="8" :maxlength="20" show-password />
        </el-form-item>
        <el-form-item label="秀币余额：">
            <el-input v-model="form.money" />
        </el-form-item>
        <el-form-item label="欢乐券：">
            <el-input v-model="form.coupon" />
        </el-form-item>
        <el-form-item label="性别：">
            <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="3">保密</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="身份类型：">
            <el-radio-group v-model="form.identity">
                <el-radio :label="1">用户</el-radio>
                <el-radio :label="2">普通主播</el-radio>
                <el-radio :label="3">情感厅房主</el-radio>
                <el-radio :label="4">情感厅普通主播</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="分区类型：">
            <el-radio-group v-model="form.talent">
                <el-radio :label="1">唱歌</el-radio>
                <el-radio :label="2">跳舞</el-radio>
                <el-radio :label="3">二次元</el-radio>
                <el-radio :label="4">搞笑</el-radio>
                <el-radio :label="5">无</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="公会ID: ">
            <el-input v-model="form.familyId" />
        </el-form-item>
        <el-form-item label="公会名称: ">
            <el-input v-model="form.familyName" />
        </el-form-item>
        <el-form-item class="oper">
            <el-button type="primary" @click="handleSubmit">生成账号</el-button>
            <el-button>重置表单</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label) {
    width: 88px;
    justify-content: flex-start;
}
.oper {
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    userId: 0,
    nickName: '',
    avatar: '',
    password: '',
    money: 0,
    coupon: 0,
    gender: 3,
    identity: 1, 
    level: 0,
    levelName: '',
    talent: 5,
    familyId: 10222,
    familyName: '星互娱',
})

const handleSubmit = () => {
  console.log('submit!')
}
</script>