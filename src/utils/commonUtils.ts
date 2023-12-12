// 设备是否为手机端
export const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|ipad/i.test(navigator.userAgent);

// 跳转直播间链接前缀
export const preRoom = isMobile ? "https://www.kktv1.com/m/?roomid=" : "https://www.kktv5.com/";

// 礼物id拼接礼物图片
export const imgById = (giftId: number | string | undefined): string => giftId
    ? isMobile
        ? `http://rescdn.kktv8.com/kktv/icon/bang/png/${giftId}.png`
        : `https://rescdn.kktv8.com/kktv/icon/web/gift/png_80/${giftId}.png` : '';