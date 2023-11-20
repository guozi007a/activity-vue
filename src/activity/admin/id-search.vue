<template>
    <div class="search-wrap">
        <el-input v-model.number="searchId" placeholder="输入用户id" />
        <el-button type="primary">搜索</el-button>
    </div>
    <ul class="info-list">
        <li class="info" v-for="(v, k) in userInfo" :key="k">
            <el-text class="alias">
                <span>{{ infoLabel[k] }}</span>
                <div class="modify-info" v-if="!editKey || editKey == k">
                    <el-icon class="edit" title="修改" v-if="editKey != k" @click="editKey = k"><Edit /></el-icon>
                    <el-icon class="confirm" title="确认" v-if="editKey == k"><CircleCheck /></el-icon>
                    <el-icon class="cancel" title="取消" v-if="editKey == k" @click="editKey = ''"><CircleClose /></el-icon>
                </div>
            </el-text>
            <el-text class="info-text" v-if="!editKey || editKey != k">{{
                k == 'gender'
                    ? genderList[v as number - 1]
                    : k == 'identity'
                        ? identityList[v as number - 1]
                        : k == 'talent'
                            ? talentList[v as number - 1]
                            : k == 'avatar' && v == ''
                                ? '无'
                                : v
            }}</el-text>
            <el-input v-if="editKey == k && infoTypes1.includes(k)" />
            <el-input v-if="editKey == k && infoTypes2.includes(k)" />
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

const searchId = ref<number>()
const editKey = ref<string>('')

interface UserInfoConfig {
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

const infoLabel = {
    userId: 'ID',
    username: '用户名',
    nickName: '昵称',
    avatar: '头像地址',
    password: '密码',
    money: '秀币余额',
    coupon: '欢乐券',
    gender: '性别',
    identity: '身份类型', 
    userLevel: '用户等级及名称',
    actorLevel: '主播等级及名称',
    talent: '分区类型',
    familyId: '公会Id',
    familyName: '公会名称',
    birthday: '生日日期',
}

const genderList = ['男', '女', '保密']
const identityList = ['用户', '普通主播', '情感厅房主', '情感厅普通主播']
const talentList = ['唱歌', '跳舞', '二次元', '搞笑', '无']
const infoTypes1 = ['userId', 'money', 'coupon', 'userLevel', 'actorLevel', 'familyId']
const infoTypes2 = ['username', 'nickName', 'avatar', 'password', 'familyName']
// const infoTypes3 = ['gender', 'identity', 'talent']
// const infoTypes4 = ['birthday']

const userInfo = reactive<UserInfoConfig>({
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

</script>