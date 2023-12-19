<template>
    <!-- [Vue warn] Set operation on key "isAddVisible" failed: target is readonly -->
    <!-- 解决方法：将v-model="isAddVisible"改为:model-value="isAddVisible" -->
    <el-dialog :model-value="isAddVisible" title="Tips" width="30%">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="$emit('close')">Cancel</el-button>
                <el-button type="primary" @click="$emit('close')">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { toRefs } from 'vue'
interface PropType {
    isAddVisible?: boolean
}

const props = defineProps<PropType>()
const {isAddVisible} = toRefs(props)
</script>