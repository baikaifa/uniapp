export const env = import.meta.env.MODE || "development";
// 判断是否为生产环境
export function isProduction() {
  return env === "production";
}
const HOST_BASE_URL: any = {
  development: "http://localhost:3000",
  production: "http://82.157.175.138:3001",
};
export const BASE_URL = HOST_BASE_URL[env];
