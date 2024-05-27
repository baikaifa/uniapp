import { reactive } from "vue";
import { storage } from "@/utils";
let state: any = reactive({
  userId: storage.get("userId") || "",
  name: storage.get("name") || "",
  openId: storage.get("openId") || "",
  phone: storage.get("phone") || "",
  address: storage.get("address") || "",
  remake: storage.get("remake") || "",
});
function setUserInfo(userInfo: any) {
  if (userInfo.userId) {
    storage.set("userId", userInfo.userId);
    state.userId = userInfo.userId;
  }
  if (userInfo.openid) {
    storage.set("openId", userInfo.openid);
    state.openId = userInfo.openid || "";
  }
  if (userInfo.phone) {
    storage.set("phone", userInfo.phone);
    state.phone = userInfo.phone;
  }
  if (userInfo.address) {
    storage.set("address", userInfo.address);
    state.address = userInfo.address;
  }
  if (userInfo.name) {
    storage.set("name", userInfo.name);
    state.name = userInfo.name;
  }
  if (userInfo.remake) {
    storage.set("remake", userInfo.remake);
    state.remake = userInfo.remake;
  }
}

export const CommonModule = {
  state,
  action: { setUserInfo },
};
