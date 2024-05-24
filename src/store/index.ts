import { reactive } from "vue";
import { storage } from "@/utils";
let state: any = reactive({
  userId: storage.get("userId") || "",
  openId: storage.get("openId") || "",
  phone: storage.get("phone") || "",
  address: storage.get("address") || "",
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
}

export const CommonModule = {
  state,
  action: { setUserInfo },
};
