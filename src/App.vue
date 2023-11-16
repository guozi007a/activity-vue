<script setup lang="ts">
// import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Nav from '~/components/nav.vue'

const route = useRoute()
// 后台不需要显示Nav
const isNavVisible = route.path.includes('activity_')

</script>

<template>
    <Nav v-if="isNavVisible" />
    <router-view></router-view>
</template>

