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
