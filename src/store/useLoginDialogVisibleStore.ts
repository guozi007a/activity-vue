/** 打开/隐藏登录框 */
import { defineStore } from 'pinia'

export const useLoginDialogVisibleStore = defineStore('login-dialog', {
    state: () => ({ visible: false }),
    actions: {
        open() {
            this.visible = true
        },
        close() {
            this.visible = false
        }
    }
}) 