<template>
    <Nav v-if="isNavVisible" />
    <router-view></router-view>
    <Teleport to="body">
        <Login />
    </Teleport>
</template>

<script setup lang="ts">
import Nav from '~/components/nav.vue'
import Login from './components/login.vue';

// 后台不需要显示Nav
const isNavVisible = location.pathname.includes('activity_')

</script>