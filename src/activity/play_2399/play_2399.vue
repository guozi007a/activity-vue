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
                <div class="receive" :class="receiveStatus[status]" @click="status == 1 && sign()"></div>
            </div>
            <div class="cont cont2">
                <p class="p1">11月23日11:00-11月24日24:00，用户充值达到指定金额可翻开卡牌并获得奖励。每轮可翻4张卡牌，翻牌次数越多，中大奖概率越高，最高可翻出爱满星河！（该环节可循环完成）</p>
                <p class="p2">注：若每轮充值金额大于5000元时，多余部分不累计至下一轮，需翻完卡牌方可开启新一轮。</p>
                <p class="p3">本轮已充值金额：{{ profile.isLogin ? count : '--' }}元</p>
                <ul class="cards">
                    <li class="card_li" :class="`card_li${i + 1}`" v-for="(v, i) in cardsInfo" :key="i">
                        <div class="card" :class="`card${i + 1}`">
                            <template v-if="v.prizeId">
                                <div class="gift_img">
                                    <img :src="imgById(v.prizeId)" alt="">
                                </div>
                                <p class="gift_name">{{ v.prizeName }}</p>
                            </template>
                        </div>
                        <p class="card_money">{{ cardsMoney[i] }}元</p>
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
import { ref, onMounted } from 'vue';
import { lookGifts } from './dep'
import { useLoginStore } from '~/store/useLoginStore';
import { getSignInfoAPI, SignAPI, cardInfoAPI } from '~/api/play_2399';
import type { SignInfoParam } from '~/api/play_2399'
import { useLoginDialogVisibleStore } from '~/store/useLoginDialogVisibleStore';
import { imgById } from '~/utils/commonUtils'

interface CardInfo {
    position: number
    prizeId: number
    prizeName: string
}

const initCardsInfo: CardInfo[] = []
for (let i = 0; i < 4; i++) {
    initCardsInfo.push({
        position: i + 1,
        prizeId: 0,
        prizeName: "",
    })
}

document.title = '感恩回馈季'
const receiveStatus = ['', 'active', 'received']
const cardsMoney = [100, 500, 2000, 5000]

const dialogNum = ref<number>(-1)
const status = ref<number>(0)
const count = ref<number>(0)
const cardsInfo = ref<CardInfo[]>(initCardsInfo)

const profile = useLoginStore().profile
const loginDialog = useLoginDialogVisibleStore()

const sign = async () => {
    if (!profile.isLogin) {
        loginDialog.open()
        return
    }
    const params: SignInfoParam = {
        userId: profile.userId!,
        token: profile.token!,
    }
    const res = await SignAPI(params)
    if (res.code === "0") {
        let str = ''
        res.data.forEach((v: string, i: number) => {
            if (i == 0) {
                str = v
            } else {
                if (v) {
                    str += `、${v}`
                }
            }
        })
        ElMessage.success(`签到成功！恭喜获得${str}!`)
        status.value = 2
    } else {
        ElMessage.error(res.message)
    }
}

const getSignInfo = async () => {
    if (!profile.isLogin) return
    const params: SignInfoParam = {
        userId: profile.userId!,
        token: profile.token!,
    }
    const res = await getSignInfoAPI(params)
    if (res.code === "0") {
        status.value = res.data
    }
}

const getCardInfo = async () => {
    if (!profile.isLogin) return
    const params: SignInfoParam = {
        userId: profile.userId!,
        token: profile.token!,
    }
    const res = await cardInfoAPI(params)
    if (res.code === "0") {
        count.value = res.data.count
        cardsInfo.value = res.data.list
    }
}

onMounted(() => {
    getSignInfo()
    getCardInfo()
})
</script>