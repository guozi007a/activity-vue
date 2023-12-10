<template>
    <Nav v-if="isNavVisible" />
    <router-view></router-view>
    <Teleport to="body">
        <Login />
    </Teleport>
</template>

<script setup lang="ts">
import { watchEffect, onMounted } from 'vue';
import Nav from '~/components/nav.vue'
import Login from './components/login.vue';
import { useLoginStore } from '~/store/useLoginStore'
import { checkTimeAPI } from './api/checkTime';

// 后台不需要显示Nav
const isNavVisible = location.pathname.includes('activity_')
const profileStore = useLoginStore()

watchEffect(() => {
    profileStore.getProfile()
})

onMounted(async () => {
    const res = await checkTimeAPI()
    if (res.code === "0") {
        const now = Date.now()
        console.log("server time: ", res.data)
        console.log("local time: ", now)
        console.log("diff time: ", res.data - now)
    }
})
</script>