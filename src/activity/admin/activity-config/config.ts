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