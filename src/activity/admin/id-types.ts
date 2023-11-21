// 创建id中表单字段类型
export interface FormConfig {
    userId: number
    username: string
    nickName: string
    avatar: string
    password: string
    money: number
    coupon: number
    gender: number
    identity: number
    userLevel: number
    actorLevel: number
    talent: number
    familyId: number
    familyName: string
    birthday: string
}

/**
 * id相关的信息
 * label 表示该字段表示的含义
 * type 表示该字段的值对应的表单类型 1-值为数字的输入框 2-值为字符串的输入框 3-日期选择器 4-单选框
 * list 表示单选框的可选值列表
 */
interface infoValConfig {
    label: string
    type: 1 | 2 | 3 | 4
    list?: string[]
}
export const idInfo: Record<keyof FormConfig, infoValConfig> = {
    userId: { label: 'ID', type: 1 },
    username: { label: '用户名', type: 2 },
    nickName: { label: '昵称', type: 2 },
    avatar: { label: '头像地址', type: 2 },
    password: { label: '密码', type: 2 },
    money: { label: '秀币余额', type: 1 },
    coupon: { label: '欢乐券', type: 1 },
    gender: { label: '性别', type: 4, list: ['男', '女', '保密'] },
    identity: { label: '身份类型', type: 4, list: ['用户', '普通主播', '情感厅房主', '情感厅普通主播'] },
    userLevel: { label: '用户等级', type: 1 },
    actorLevel: { label: '主播等级', type: 1 },
    talent: { label: '分区类型', type: 4, list: ['唱歌', '跳舞', '二次元', '搞笑', '无'] },
    familyId: { label: '公会Id', type: 1 },
    familyName: { label: '公会名称', type: 2 },
    birthday: { label: '生日日期', type: 3 },
}