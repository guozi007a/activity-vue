<template>
    <Transition name="login">
        <div class="login-wrap" v-if="loginStore.visible">
            <div class="login-mask" @click="handleClose"></div>
        <div class="login-container">
            <div class="login-x" @click="handleClose">
                <el-icon><Close /></el-icon>
            </div>
            <div class="login-main">
                <ul class="login-select">
                    <li class="login-option" :class="tabKey == 0 ? 'active' : ''" @click="tabKey = 0">普通登录</li>
                    <li class="login-option" :class="tabKey == 1 ? 'active' : ''" @click="tabKey = 1">手机号快捷登录</li>
                </ul>
                <div class="login-content">
                    <div class="cont1">
                        <input type="text" class="username" autofocus placeholder="用户名" v-model.number="val">
                        <input type="text" class="password" placeholder="密码" v-model="psd">
                        <div class="tools">
                            <label for="save" class="save">
                                <input type="checkbox">7天内记住我
                            </label>
                            <p class="forget">忘记密码</p>
                        </div>
                        <p class="login-btn" @click="handleLogin(val ?? 0, psd)">登录</p>
                        <p class="registe">
                            <span>还没有账号？</span>
                            立即注册
                        </p>
                        <div class="third-wrap">
                            <p class="third-title">第三方账号登录</p>
                            <div class="third">
                                <img src="https://www.kktv5.com/images/user/wx.png" alt="">
                                <img src="http://www.kktv5.com/images/user/qq.png" alt="">
                                <img src="http://www.kktv5.com/images/user/wb.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Transition>
</template>

<style scoped lang="scss">
.login-wrap {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s;
    .login-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        transition: all .5s;
    }
    .login-container {
        position: relative;
        background-color: #fff;
        border-radius: 14px;
        box-sizing: border-box;
        transition: all .3s;
        box-sizing: border-box;
        padding: 32px 22px;

        .login-x {
            position: absolute;
            z-index: 1;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 2px;

            svg {
                width: 100%;
                height: 100%;
            }
            &:hover {
                background-color: #e8e8e8;
            }
        }
        .login-main {
            width: 300px;
            .login-select {
                width: 100%;
                display: flex;
                gap: 20px;
                .login-option {
                    position: relative;
                    color: #999;
                    font-size: 16px;
                    user-select: none;
                    cursor: pointer;
                    &.active {
                        color: #333;
                        &::after {
                            content: "";
                            position: absolute;
                            z-index: 1;
                            bottom: -5px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 24px;
                            height: 3px;
                            border-radius: 2px;
                            background-color: #ffd630;
                        }
                    }
                }
            }
            .login-content {
                width: 100%;
                margin-top: 32px;
                .cont1 {
                    width: 100%;
                    .username, .password {
                        width: 100%;
                        height: 32px;
                        box-shadow: 0 0 6px 2px rgba(0, 0, 0, .12);
                        border-radius: 4px;
                        box-sizing: border-box;
                        padding: 0 12px;
                        color: #666;
                    }
                    .password {
                        margin-top: 20px;
                    }
                    .tools {
                        width: 100%;
                        height: 32px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 12px;
                        margin-top: 6px;
                        color: #666;
                        .save {
                            display: flex;
                            align-items: center;
                        }
                        .forget {
                            cursor: pointer;
                            user-select: none;
                        }
                    }
                    .login-btn {
                        width: 100%;
                        height: 34px;
                        margin-top: 20px;
                        text-align: center;
                        line-height: 34px;
                        background-color: #ffd630;
                        user-select: none;
                        cursor: pointer;
                        letter-spacing: 2px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    .registe {
                        color: #666;
                        font-size: 12px;
                        margin-top: 10px;
                        user-select: none;
                        span {
                            color: #999;
                        }
                    }
                    .third-wrap {
                        width: 100%;
                        margin-top: 30px;
                        .third-title {
                            text-align: center;
                            color: #666;
                        }
                        .third {
                            display: flex;
                            justify-content: center;
                            gap: 16px;
                            margin-top: 15px;
                            img {
                                width: 42px;
                                height: 42px;
                                border-radius: 50%;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
}
.login-enter-from {
    width: 0;
    height: 0;
    opacity: 0;
    .login-container {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
.login-leave-to {
    width: 0;
    height: 0;
    opacity: 0;
    .login-container {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginDialogVisibleStore } from '~/store/useLoginDialogVisibleStore.js';
import { useLoginStore } from '~/store/useLoginStore'
import { Close } from '@element-plus/icons-vue';

const loginStore = useLoginDialogVisibleStore()
const tabKey = ref<number>(0)
const profileStore = useLoginStore()
const val = ref<number | undefined>()
const psd = ref<string>('Aa123456')

const handleClear = () => {
    val.value = undefined
    psd.value = ''
}
const handleClose = () => {
    loginStore.close()
    handleClear()
}
const handleLogin = (userId: number, password: string) => {
    if (!userId || !password) {
        ElMessage.warning('账号密码不能为空')
        return
    }
    profileStore.login(userId, password)
    handleClear()
}
</script>