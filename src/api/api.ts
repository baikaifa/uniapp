import { BASE_URL } from "@/environment";
interface requestOptions {
  url: string;
  method?:
    | "GET"
    | "OPTIONS"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT"
    | undefined;
  headers?: any;
  data?: any;
}
export default function request(options: requestOptions) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.headers || { "content-type": "application/json" }, // 设置请求头
      success: (res: any) => {
        console.log(res);
        if (res.data.code === 200) {
          // 服务器返回数据成功
          resolve({
            isValid: true,
            data: res.data.data,
          });
        } else {
          // 服务器返回错误信息
          uni.showToast({
            title: "网络异常请稍后...", // res.data.message,
            icon: "none",
          });
          reject({
            isValid: false,
            data: res.data.message,
          });
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "网络异常请稍后...",
          icon: "none",
        });
        reject(err); // 请求失败
      },
    });
  });
}
