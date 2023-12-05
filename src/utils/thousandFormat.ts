// 数字千分
export const thousandFormat = (param?: number | string): string => {
    if (param === undefined || param === null) return ''
    if (typeof param === 'string' && param.trim() === '') return ''
    return (param + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}