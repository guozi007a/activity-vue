<template>
    <nav class="nav_wrap">
        <div class="nav_main">
            <div class="nav_left">
                <a href="/" class="logo_link">
                    <img src="https://rescdn.kktv8.com/kk-web-res/main/logo.png" alt="">
                </a>
                <a href="" class="left_link home_link">首页</a>
                <a href="" class="left_link ground_link">
                    广场
                    <div class="left_link arrow"></div>
                </a>
                <a href="" class="left_link wall_link">荣誉墙</a>
                <a href="" class="left_link activity_link">活动</a>
                <a href="" class="left_link store">道具商城</a>
                <div class="search_wrap">
                    <input type="text" class="inp" placeholder="搜索主播昵称/ID">
                    <div class="search"></div>
                </div>
            </div>
            <div class="nav_right">
                <a href="" class="watched_link">看过</a>
                <a href="" class="charge_link">充值</a>
                <a href="" class="download_link">下载</a>
                <p class="login_btn" v-if="!isLogin" @click="loginStore.open()">登录</p>
                <div class="login-info" v-if="isLogin">
                    <div class="avatar">
                        <img src="http://testares.kktv8.com/kktv/portrait/20220422/11/10000338_722862.jpg!48" alt="">
                    </div>
                    <div class="exit-wrap">
                        <p class="exit">退出</p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use '~/assets/mixin';
.nav_wrap {
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, .08);

    .nav_main {
        width: 1030px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin: auto;

        .nav_left,
        .nav_right {
            display: flex;
            align-items: center;
            gap: 25px;
        }

        .nav_left {
            .logo_link {
                width: 76px;
                height: 34px;

                img {
                    width: 100%;
                }
            }

            a {
                position: relative;

                &.left_link:hover::before {
                    content: "";
                    position: absolute;
                    z-index: 1;
                    bottom: -7px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 16px;
                    height: 3px;
                    background-color: #ffd630;
                }
            }

            .search_wrap {
                position: relative;

                .inp {
                    box-sizing: border-box;
                    padding: 0 16px;
                    width: 158px;
                    height: 32px;
                    border-radius: 16px;
                    background-color: #F1F2F4;
                    font-size: 12px;
                    transition: width .3s;
                    caret-color: #8e8e8e; /** 设置输入框光标样式 */

                    &:focus {
                        width: 178px;
                        transition: width .3s;
                    }
                }

                .search {
                    position: absolute;
                    z-index: 1;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    @include mixin.set-url-bg('http://beta.kktv8.com/images/nav/newui/search_default.png');
                    cursor: pointer;

                    &:hover {
                        @include mixin.set-url-bg('http://beta.kktv8.com/images/nav/newui/search_hover.png');
                    }
                }
            }
        }

        .nav_right {
            .login_btn {
                width: 72px;
                height: 28px;
                border-radius: 14px;
                text-align: center;
                line-height: 28px;
                background-color: #ffd630;
                user-select: none;
                cursor: pointer;
            }
            .login-info {
                position: relative;
                width: 36px;
                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .exit-wrap {
                    position: absolute;
                    z-index: 1;
                    top: 36px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 100px;
                    background-color: #fff;
                    border-radius: 10px;
                    display: none;
                    .exit {
                        width: 80px;
                        height: 30px;
                        margin: auto;
                        background-color: #ffd630;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 4px;
                        margin-top: 30px;
                        user-select: none;
                        cursor: pointer;
                    }
                }
                &:hover {
                    .exit-wrap {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { useLoginStore } from '~/store/useLoginStore'

const loginStore = useLoginStore()
const isLogin = false
</script>