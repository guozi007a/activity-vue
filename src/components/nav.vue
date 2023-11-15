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
                <p class="login_btn">登录</p>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
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
                    padding: 0 12px;
                    width: 158px;
                    height: 32px;
                    border-radius: 16px;
                    background-color: #F1F2F4;
                    font-size: 12px;
                    transition: width .3s;
                    caret-color: #8e8e8e;

                    &:focus {
                        width: 174px;
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
                    background: url(http://beta.kktv8.com/images/nav/newui/search_default.png) no-repeat center center;
                    background-size: contain;
                    cursor: pointer;

                    &:hover {
                        background: url(http://beta.kktv8.com/images/nav/newui/search_hover.png) no-repeat center center;
                        background-size: contain;
                    }
                }
            }
        }
    }
}
</style>