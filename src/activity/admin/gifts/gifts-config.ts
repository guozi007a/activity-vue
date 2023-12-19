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
}
export const giftList: GiftResItem[] = new Array(201).fill({ giftId: 40000001, giftName: '礼物1', giftTypeId: 1, giftType: '普通礼物', extendsTypes: [{ extendsId: 1001, extendsName: '经典礼物' }], giftTags: [{ giftTagId: 1, giftTagName: '挖宝礼物' }], giftValue: 50, createDate: 1702885997197 })

export const tags = ['', 'info', 'success', 'warning', 'danger']