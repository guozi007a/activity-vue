<template>
<div class="show_wrap">
    <div class="show_bg">
        <div class="bg" :class="`bg${i}`" v-for="i in 4"></div>
    </div>
    <div class="show_main">
        <div class="headtitle"></div>
        <div class="show_cont">
            <div class="cont cont1">
                <p class="p1">每日充值10元及以上即可签到，签到时必得感恩节勋章1天，有机会获得盲盒奖励！<span>注：每个ID每日仅限领取一次</span></p>
                <div class="receive"></div>
            </div>
            <div class="cont cont2">
                <p class="p1">11月23日11:00-11月24日24:00，用户充值达到指定金额可翻开卡牌并获得奖励。每轮可翻4张卡牌，翻牌次数越多，中大奖概率越高，最高可翻出爱满星河！（该环节可循环完成）</p>
                <p class="p2">注：若每轮充值金额大于5000元时，多余部分不累计至下一轮，需翻完卡牌方可开启新一轮。</p>
                <p class="p3">本轮已充值金额：9999元</p>
                <ul class="cards">
                    <li class="card_li" :class="`card_li${i + 1}`" v-for="(_, i) in [1, 2, 3, 4]" :key="i">
                        <div class="card" :class="`card${i + 1}`">
                            <template v-if="false">
                                <div class="gift_img">
                                    <img src="" alt="">
                                </div>
                                <p class="gift_name">礼物名称</p>
                            </template>
                        </div>
                        <p class="card_money">xxxx元</p>
                        <div class="look" @click="dialogNum = i"></div>
                    </li>
                </ul>
            </div>
            <div class="cont cont3"></div>
        </div>
        <div class="show_tip"></div>
    </div>
</div>
<div class="dialog" v-if="dialogNum >= 0">
    <div class="dialog_mask" @click="dialogNum = -1"></div>
    <div class="dialog1">
        <div class="dialog_x" @click="dialogNum = -1"></div>
        <p class="p1">翻开卡牌时有机会获得</p>
        <ul class="gifts">
            <li class="gift_li" v-for="v in lookGifts[dialogNum]">
                <div class="gift_img">
                    <img :src="v.url" alt="">
                </div>
                <p class="gift_name">{{ v.name }}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<style scoped lang="scss">
@use './play_2399.scss';
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { lookGifts } from './dep'

document.title = '感恩回馈季'

const dialogNum = ref<number>(-1)
</script>