<template>
  <!-- <p class="title">我的信息</p> -->
  <div class="car-box">
    <form @submit="formSubmit">
      <view class="uni-form-item uni-column">
        <view class="title">姓名</view>
        <input
          class="uni-input"
          inputmode="text"
          maxlength="6"
          name="name"
          :value="name"
          placeholder="请输入姓名"
        />
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">手机号</view>
        <input
          class="uni-input"
          inputmode="numeric"
          name="phone"
          maxlength="11"
          :value="phone"
          placeholder="请输入手机号"
        />
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">地址信息</view>
        <input
          class="uni-input"
          name="address"
          maxlength="200"
          :value="address"
          placeholder="请输入地址信息"
        />
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">备注信息(选填)</view>
        <input
          class="uni-input"
          name="remake"
          maxlength="200"
          :value="remake"
          placeholder="请输入备注信息"
        />
      </view>
      <view class="uni-btn-v">
        <button form-type="submit">保存/修改</button>
      </view>
    </form>
  </div>
  <div class="empty"></div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { CommonModule } from "@/store";
import { updateUserInfo } from "@/api";
const openId = computed(() => CommonModule.state.openId);
const phone = computed(() => CommonModule.state.phone);
const name = computed(() => CommonModule.state.name);
const address = computed(() => CommonModule.state.address);
const remake = computed(() => CommonModule.state.remake);
const formSubmit = async (e) => {
  console.log(
    "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
  );
  CommonModule.action.setUserInfo(e.detail.value);
  if (!e.detail.value.name) {
    uni.showToast({
      icon: "none",
      mask: true,
      title: `请填写姓名`,
    });
    return;
  }
  if (!e.detail.value.phone) {
    uni.showToast({
      icon: "none",
      mask: true,
      title: `请填写手机号`,
    });
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(e.detail.value.phone)) {
    uni.showToast({
      icon: "none",
      mask: true,
      title: `手机号格式有误`,
    });
    return;
  }
  if (!e.detail.value.address) {
    uni.showToast({
      icon: "none",
      mask: true,
      title: `请填写地址信息`,
    });
    return;
  }
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const res = await updateUserInfo({
      openid: openId.value,
      ...e.detail.value,
    });
    if (!res.isValid) return;
    uni.showToast({
      icon: "none",
      mask: true,
      title: `保存成功`,
    });
  } finally {
    uni.hideLoading();
  }
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
