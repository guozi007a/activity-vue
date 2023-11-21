/** 登录 */
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
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