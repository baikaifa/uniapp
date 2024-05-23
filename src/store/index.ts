import { reactive } from "vue";
import { storage } from "@/utils";
let state: any = reactive({
  userId: storage.get("userId") || "",
  openId: storage.get("openId") || "",
  phone: storage.get("phone") || "",
  address: storage.get("address") || "",
});
function setUserInfo(userInfo: any) {
  storage.set("userId", userInfo.userId);
  storage.set("openId", userInfo.openId);
  storage.set("phone", userInfo.phone);
  storage.set("address", userInfo.address);
  state.userId = userInfo.userId;
  state.openId = userInfo.openId || "";
  state.phone = userInfo.phone;
  state.address = userInfo.address;
}
export const CommonModule = {
  state,
  action: { setUserInfo },
};
