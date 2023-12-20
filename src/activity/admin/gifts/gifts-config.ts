/* 礼物分类 */
export interface GiftTypeConfig {
    giftTypeId: number
    giftTypeName: string
}
export const giftTypes: GiftTypeConfig[] = [
    { giftTypeId: 1, giftTypeName: "普通礼物" },
    { giftTypeId: 2, giftTypeName: "高级礼物" },
    { giftTypeId: 3, giftTypeName: "豪华礼物" },
    { giftTypeId: 4, giftTypeName: "促销礼物" },
    { giftTypeId: 5, giftTypeName: "幸运礼物" },
    { giftTypeId: 6, giftTypeName: "道具礼物" },
]

/* 礼物类型拓展 */
export interface GiftTypeExtendsConfig {
    extendsId: number
    extendsName: string
}
export const giftTypeExtends: GiftTypeExtendsConfig[] = [
    { extendsId: 1001, extendsName: '经典礼物' },
    { extendsId: 1002, extendsName: '玩法礼物' },
    { extendsId: 1003, extendsName: '特权礼物' },
]

/* 礼物标签 */
export interface GiftTagConfig {
    giftTagId: number
    giftTagName: string
}
export const giftTags: GiftTagConfig[] = [
    { giftTagId: 1, giftTagName: "盲盒礼物" },
    { giftTagId: 2, giftTagName: "挖宝礼物" },
    { giftTagId: 3, giftTagName: "折扣礼物" },
    { giftTagId: 4, giftTagName: "活动礼物" },
    { giftTagId: 5, giftTagName: "公益礼物" },
    { giftTagId: 6, giftTagName: "等级礼物" },
    { giftTagId: 7, giftTagName: "粉丝礼物" },
]

/* 礼物角标 */
export interface CornerMarkConfig {
    cornerMarkId: number
    cornerMarkName: string
}
export const cornerMarks: CornerMarkConfig[] = [
    { cornerMarkId: 0, cornerMarkName: "无" },
    { cornerMarkId: 100068, cornerMarkName: "活动" },
    { cornerMarkId: 100084, cornerMarkName: "年度" },
    { cornerMarkId: 100069, cornerMarkName: "玩法" },
    { cornerMarkId: 100082, cornerMarkName: "音效" },
    { cornerMarkId: 100072, cornerMarkName: "等级" },
    { cornerMarkId: 100075, cornerMarkName: "特效" },
    { cornerMarkId: 100076, cornerMarkName: "夏" },
    { cornerMarkId: 100059, cornerMarkName: "1折" },
    { cornerMarkId: 100060, cornerMarkName: "2折" },
    { cornerMarkId: 100061, cornerMarkName: "3折" },
    { cornerMarkId: 100062, cornerMarkName: "4折" },
    { cornerMarkId: 100063, cornerMarkName: "5折" },
    { cornerMarkId: 100064, cornerMarkName: "6折" },
    { cornerMarkId: 100065, cornerMarkName: "7折" },
    { cornerMarkId: 100066, cornerMarkName: "8折" },
    { cornerMarkId: 100067, cornerMarkName: "9折" },
    { cornerMarkId: 100077, cornerMarkName: "周星" },
    { cornerMarkId: 100071, cornerMarkName: "公益" },
    { cornerMarkId: 100081, cornerMarkName: "战神" },
    { cornerMarkId: 100073, cornerMarkName: "粉丝" },
    { cornerMarkId: 100074, cornerMarkName: "粉丝" },
    { cornerMarkId: 100079, cornerMarkName: "收藏馆" },
    { cornerMarkId: 100078, cornerMarkName: "天梯" },
    { cornerMarkId: 100056, cornerMarkName: "星际" },
    { cornerMarkId: 100057, cornerMarkName: "公益" },
    { cornerMarkId: 100058, cornerMarkName: "告白" },
    { cornerMarkId: 100070, cornerMarkName: "星际" },
    { cornerMarkId: 100080, cornerMarkName: "夏" },
    { cornerMarkId: 100083, cornerMarkName: "好感度" },
    { cornerMarkId: 100085, cornerMarkName: "秋季" },
]

/* 礼物列表 */
export interface GiftResItem {
    giftId: number
    giftName: string
    giftTypeId: number
    giftType: string
    extendsTypes: GiftTypeExtendsConfig[]
    giftTags: GiftTagConfig[]
    giftValue: number
    createDate: number
    giftDescribe: string
    cornerMarkId: number
    cornerMarkName: string
}
export const giftList: GiftResItem[] = new Array(201).fill({ giftId: 40000001, giftName: '礼物1', giftTypeId: 1, giftType: '普通礼物', extendsTypes: [{ extendsId: 1001, extendsName: '经典礼物' }], giftTags: [{ giftTagId: 1, giftTagName: '挖宝礼物' }], giftValue: 50, createDate: 1702885997197, cornerMarkId: 100068, cornerMarkName: "活动" })

export const tags = ['', 'info', 'success', 'warning', 'danger']