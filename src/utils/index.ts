/** wechat_openid storage key */
export class Storage<T extends object = any> {
  get<K extends keyof Omit<T, symbol>>(key: K): T[K] | undefined {
    const item = uni.getStorageSync(key + "");
    if (!item) return undefined;
    try {
      return JSON.parse(item);
    } catch (err) {
      // parse失败静默返回
      return item;
    }
  }

  set<K extends keyof Omit<T, symbol>>(key: K, value: T[K]): void {
    const item = JSON.stringify(value);
    uni.setStorageSync(key + "", item);
  }

  remove<K extends keyof Omit<T, symbol>>(key: K): void {
    uni.removeStorageSync(key + "");
  }
}

export interface StorageType {
  redirect: {
    type: "h5" | "page" | string;
    url: string;
    params?: object;
  };
  token: string;
  uid: string;
  openId: string;
  phone: string;
  passport_token: string;
  city_code: string;
  historyReversion: any;
  historyCityData: any;
  companySearchHistory: any;
  commuteTimePick: string;
  commuteMinute: string;
  unionId: string;
  isAgree: boolean;
  countdown: string | number;
  [propName: string]: any;
}

export const storage = new Storage<StorageType>();

export const formatDate = (date: string) => {
  const t = new Date(Number(date));
  return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日`;
};
export const formatStatus = (status: 0 | 1 | 2) => {
  let t = "";
  switch (status) {
    case 0:
      t = "待处理";
      break;
    case 1:
      t = "处理中";
      break;
    case 2:
      t = "已完成";
      break;
  }
  return t;
};

export const formatHTML = (s: string) => {
  if (!s) return "";
  const t = s.replace(/\<img/gi, '<img class="timg" ');
  return t;
};
