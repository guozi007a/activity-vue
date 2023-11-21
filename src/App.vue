<script setup lang="ts">
import Nav from '~/components/nav.vue'

// 后台不需要显示Nav
const isNavVisible = location.pathname.includes('activity_')

</script>

<template>
    <Nav v-if="isNavVisible" />
    <router-view></router-view>
</template>

