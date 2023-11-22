<template>
    <div class="search-wrap">
        <el-input v-model.number="searchId" placeholder="输入用户id" ref="searchRef" />
        <el-button type="primary" @click="handleSearch(searchId ?? 0)">搜索</el-button>
    </div>
    <ul class="info-list" v-if="userInfo.userId">
        <li class="info" v-for="(v, k) in idInfo" :key="k">
            <el-text class="alias">
                <span>{{ v.label }}</span>
                <div class="modify-info" v-if="!notModifyList.includes(k) && (!editKey || editKey == k)">
                    <el-icon class="edit" title="修改" v-if="editKey != k" @click="handleEdit(userInfo[k], k, v.type)"><Edit /></el-icon>
                    <el-icon class="confirm" title="确认" v-if="editKey == k" @click="handleConfirm(userInfo.userId, v.paramType!, k, getResultVal(v.type))"><CircleCheck /></el-icon>
                    <el-icon class="cancel" title="取消" v-if="editKey == k" @click="handleCancel"><CircleClose /></el-icon>
                </div>
            </el-text>
            <el-text class="info-text" v-if="!editKey || editKey != k">
                {{ v.type == 4 ? v.list![userInfo[k] as number - 1] : userInfo[k] }}
            </el-text>
            <el-input v-else-if="editKey == k && v.type == 1" v-model.number="value1" />
            <el-input v-else-if="editKey == k && v.type == 2" v-model="value2" />
            <el-date-picker v-else-if="editKey == k && v.type == 3" :disabled-date="disableDate" v-model="value3" />
            <div class="radio-wrap" v-else>
                <el-radio-group v-model="value4">
                    <el-radio v-for="(item, index) in v.list" :label="index + 1" :key="`${item}_${index + 1}`">{{ item }}</el-radio>
                </el-radio-group>
            </div>
        </li>
    </ul>
    <el-empty description="No Data" v-else style="margin-top: 60px;" />
</template>

<style scoped lang="scss">
.search-wrap {
    width: 100%;
    display: flex;
    gap: 15px;

    .el-input {
        max-width: 300px;
    }
}
.info-list {
    margin-top: 30px;
    .info {
        display: flex;
        height: 30px;
        box-sizing: border-box;
        padding: 0 12px;
        border-radius: 4px;

        &:nth-child(odd) {
            background-color: #fff;
        }

        .el-text {
            position: relative;
            display: inline-block;
            height: 100%;
            line-height: 30px;
            &.alias {
                width: 210px;
                flex-shrink: 0;

                .modify-info {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    right: 10px;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 10px;

                    .edit, .confirm, .cancel {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        color: #409eff;

                        svg {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Edit, CircleCheck, CircleClose } from '@element-plus/icons-vue';
import { idInfo } from './id-types';
import type { FormConfig } from './id-types';
import { searchIdAPI, updateIdInfoAPI } from '~/api/admin';

const searchId = ref<number>()
// 要被编辑的那个表单
const editKey = ref<string>('')
// 每种表单类型用一类值
const value1 = ref<number>(0) // 值为数字的输入框
const value2 = ref<string>('') // 值为字符串的输入框
const value3 = ref<string>('') // 日期选择器
const value4 = ref<number>(0) // 单选框
const resultVal = ref<number | string>('') // 不论什么表单类型，最终修改的那个表单的值
const searchRef = ref<any>() // 这里如果直接写HTMLInputElement可能有问题，因为这里是用于组件库的组件上，而不是用于原生的html上

const userInfo = reactive<FormConfig>({
    userId: 0,
    username: '',
    nickName: '',
    avatar: '',
    password: 'Aa123456',
    money: 0,
    coupon: 0,
    gender: 3,
    identity: 1, 
    userLevel: 0,
    actorLevel: 0,
    talent: 5,
    familyId: 10222,
    familyName: '星互娱',
    birthday: '2023-11-20',
})

// 不能更新的字段
const notModifyList = ['userId', 'username', 'password']

const disableDate = (date: Date) => date.getTime() > Date.now()

const handleEdit = (val: any, k: string, type: number) => {
    editKey.value = k
    if (editKey.value == k && type == 1) {
        value1.value = val as number
    } else if (editKey.value == k && type == 2) {
        value2.value = val as string
    } else if (editKey.value == k && type == 3) {
        value3.value = val as string
    } else {
        value4.value = val as number
    }
}

const getResultVal = (type: number) => {
    switch (type) {
        case 1:
            resultVal.value = value1.value
            break
        case 2:
            resultVal.value = value2.value
            break
        case 3:
            resultVal.value = value3.value
            break
        default:
            resultVal.value = value4.value
    }
    return resultVal.value
}

// 在key未知的情况下，不能直接通过userInfo[key] = value的形式进行修改新值
// 所以需要这样一一列出并修改才有效，不会报ts错误
const setNewVal = (key: string, value: number | string) => {
    switch (key) {
        case 'nickName':
            userInfo.nickName = value as string
            break
        case 'avatar':
            userInfo.avatar = value as string
            break
        case 'money':
            userInfo.money = value as number
            break
        case 'coupon':
            userInfo.coupon = value as number
            break
        case 'gender':
            userInfo.gender = value as number
            break
        case 'identity':
            userInfo.identity = value as number
            break
        case 'userLevel':
            userInfo.userLevel = value as number
            break
        case 'actorLevel':
            userInfo.actorLevel = value as number
            break
        case 'talent':
            userInfo.talent = value as number
            break
        case 'familyId':
            userInfo.familyId = value as number
            break
        case 'familyName':
            userInfo.familyName = value as string
            break
        case 'birthday':
            userInfo.birthday = value as string
            break
        default:
            return
    }
}

const handleCancel = () => {
    editKey.value = ''
}

const handleSearch = async (userId: number) => {
    if (!userId) {
        ElMessage.error('用户id不能为空~')
        return
    }
    if (editKey.value) {
        handleCancel()
    }
    const res = await searchIdAPI(userId)
    if (res.code == '0') {
        userInfo.userId = res.data.userId
        if (res.data.userId === 0) {
            ElMessage.warning('无法查询到该用户~')
            return
        }
        userInfo.username = res.data.username
        userInfo.nickName = res.data.nickName
        userInfo.avatar = res.data.avatar
        userInfo.money = res.data.money
        userInfo.coupon = res.data.coupon
        userInfo.gender = res.data.gender
        userInfo.identity = res.data.identity
        userInfo.userLevel = res.data.userLevel
        userInfo.actorLevel = res.data.actorLevel
        userInfo.talent = res.data.talent
        userInfo.familyId = res.data.familyId
        userInfo.familyName = res.data.familyName
        userInfo.birthday = res.data.birthday
    }
}
// 支持Enter
window.addEventListener('keyup', (e: KeyboardEvent) => {
    // 这里需要注意组件库和原生的区别
    // 原生是直接做对比 document.activeElement == searchRef.value
    // 组件库需要对比的是里面的ref属性 document.activeElement == searchRef.value.ref 或者
    // document.activeElement == searchRef.value.input
    // 此时在声明ref时，需要设置为any，即const searchRef = ref<any>()
    e.key == 'Enter' && searchRef.value && document.activeElement == searchRef.value.input && handleSearch(searchId.value ?? 0)
})

const handleConfirm = async (userId: number, paramType: number, key: keyof FormConfig, value: string | number) => {
    // console.log(`userid: ${userId}, paramtype: ${paramType}, key: ${key}, value: ${value}`)
    if (!userId || !paramType || !key || !value) {
        ElMessage.warning('修改失败：缺少必要参数')
        return
    }
    const res = await updateIdInfoAPI(userId, paramType, key, value)
    if (res.code == '0') {
        ElMessage.success('修改成功')
        setNewVal(key, value)
        handleCancel()
    } else {
        ElMessage.error(res.message)
    }
}
</script>