<template>
    <el-container class="container">
        <el-tabs 
            type="card"
            editable
            class="tabs"
            v-model="tabKey"
        >
            <el-tab-pane
                v-for="(v, i) in tabs"
                :key="v.name"
                :name="v.name"
            >
                <template #label>
                    <span>{{ v.title }}</span>
                </template>
                <template #default>
                    <span>{{ v.title }} - {{ i }}</span>
                </template>
            </el-tab-pane>
    </el-tabs>
    </el-container>
</template>

<style scoped lang="scss">
.container {
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;

    .tabs {
        width: 100%;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
// import type { TabPaneName } from 'element-plus'

const tabKey = ref('play_2408')
const tabs = ref([
    { title: "play_2408", name: "play_2408" },
    { title: "play_2408_room", name: "play_2408_room" },
])
</script>