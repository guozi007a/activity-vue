<template>
    <div class="search-wrap">
        <el-input v-model.number="searchId" placeholder="输入用户id" />
        <el-button type="primary">搜索</el-button>
    </div>
    <ul class="info-list">
        <li class="info" v-for="(v, k) in idInfo" :key="k">
            <el-text class="alias">
                <span>{{ v.label }}</span>
                <div class="modify-info" v-if="!editKey || editKey == k">
                    <el-icon class="edit" title="修改" v-if="editKey != k" @click="handleEdit(userInfo[k], k, v.type)"><Edit /></el-icon>
                    <el-icon class="confirm" title="确认" v-if="editKey == k"><CircleCheck /></el-icon>
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

const searchId = ref<number>()
// 要被编辑的那个表单
const editKey = ref<string>('')
// 每种表单类型用一类值
const value1 = ref<number>() // 值为数字的输入框
const value2 = ref<string>('') // 值为字符串的输入框
const value3 = ref<string>('') // 日期选择器
const value4 = ref<number>() // 单选框

const userInfo = reactive<FormConfig>({
    userId: 10323,
    username: 'aaabbbccc',
    nickName: 'hellouser',
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

const handleCancel = () => {
    editKey.value = ''
}

</script>