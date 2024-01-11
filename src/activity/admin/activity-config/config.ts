/* 低代码类型 */
export interface LowCatesConfig {
    lowType: string
    lowId: number
    comment?: string
}
export const LOW_CATES: LowCatesConfig[] = [
    { lowType: 'web-page', lowId: 1, comment: 'web页面' },
    { lowType: 'mobile-page', lowId: 2, comment: 'app页面' },
    { lowType: 'web-room', lowId: 3, comment: 'web活动条' },
    { lowType: 'mobile-room', lowId: 4, comment: 'app活动条' },
    { lowType: 'bounced', lowId: 5, comment: '直播间弹窗' },
    { lowType: 'h5', lowId: 6, comment: 'H5' },
]

/* 工具箱配置 */
export const TOOLBAR_CONFIG = [
    {
        cate: "常规",
        cateId: "common",
        soup: [
            {
                meterial: "图层", /* 带有唯一标识，指向父图层，用于识别页面代码结构 */
                meterialId: 300,
                seasonning: [
                    { handle: "父图层", handleId: 30001 },
                ]
            },
            {
                meterial: "容器",
                meterialId: 400,
                stuff: [
                    {
                        food: "基础容器",
                        foodId: 40001,
                    },
                    {
                        food: "AB容器", /* ::before or ::after */
                        foodId: 40003,
                    },
                ]
            },
            {
                meterial: "图片",
                meterialId: 401,
                stuff: [
                    {
                        food: "背景图",
                        foodId: 40101,
                    },
                ]
            },
            {
                meterial: "文本",
                meterialId: 402,
                stuff: [
                    {
                        food: "普通",
                        foodId: 40201,
                    },
                    {
                        food: "重点",
                        foodId: 40202,
                    },
                    {
                        food: "纵向排版",
                        foodId: 40203,
                    }
                ]
            },
        ]
    },
    {
        cate: "组合",
        cateId: "combine",
        soup: [],
    },
]