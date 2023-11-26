<template>
    <div class="search_wrap"></div>
    <el-table :data="tableList.slice((currentPage - 1) * 20, currentPage * 20)" stripe>
        <el-table-column label="编号" :width="150">
            <template #default="sort">
                <!-- <span>{{ sort.row.id }}</span> -->
                <span>{{ sort.$index + 1 }}</span>
            </template>
        </el-table-column>
        <el-table-column label="交互记录" prop="nickName">
            <template #default="content">
                <p class="content">
                    <span class="nickName">{{ content.row.nickName }}</span>
                    (<span class="userId">{{ content.row.userId }}</span>)
                    在<span class="date">{{ dayjs(content.row.date).format('YYYY-MM-DD HH:mm:ss:SSS') }}</span>
                    参与<span class="activity">{{ content.row.activity }}</span>活动时，
                    <span class="events">{{ content.row.events }}</span>了
                    <span class="target">{{ content.row.target }}</span>，
                    并<span class="action">{{ content.row.action }}</span>了
                    <span class="result">{{ content.row.result }}</span>。
                </p>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrap">
        <el-pagination 
            background 
            layout="prev, pager, next, jumper, total" 
            :total="tableList.length" 
            :default-page-size="20"
            :current-page="currentPage"
            @update:current-page="changeCurrentPage"
            hide-on-single-page
        />
    </div>
</template>

<style scoped lang="scss">
.content {
    .nickName {
        color: #9292f0;
    }
    .userId {
        color: #f7a5db;
        font-size: 12px;
    }
    .date {
        color: #6e9e72;
        font-size: 12px;
    }
    .activity {
        color: #dad96e;
    }
    .events {
        color: #c488dd;
    }
    .target {
        color: #55a7f5;
    }
    .action {
        color: #adbe8b;
    }
    .result {
        color: #f880ba;
    }
}
.pagination-wrap {
    margin-top: 15px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { InteractiveConfig } from './event-tracking-types';
import { dayjs } from 'element-plus'

const initList = new Array(100).fill({
    id: 100,
    date: 1701005744324,
    userId: 10323,
    nickName: '这是一个用户啊',
    activity: '感恩节回馈',
    events: '点击',
    target: '签到领奖',
    action: '获得',
    result: '狂欢盲盒',
})

const currentPage = ref<number>(1)
const tableList = ref<InteractiveConfig[]>(initList)

const changeCurrentPage = (val: number) => {
    // console.log('current page: ', val)
    currentPage.value = val
}
</script>