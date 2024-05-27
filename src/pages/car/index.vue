<template>
  <view class="title-box">
    <text>我的信息</text>
    <view>
      <text>姓名：</text>
      <text>{{ name }}</text>
    </view>
    <view>
      <text>手机号：</text>
      <text>{{ phone }}</text>
    </view>
    <view>
      <text>地址：</text>
      <text>{{ address }}</text>
    </view>
    <view class="btn">
      <button size="mini" @click="handleToAddress">去修改</button>
    </view>
  </view>
  <view class="remake-box" v-if="info && info.list?.length">
    <view class="title">订单备注<text>(可选)</text></view>
    <view class="uni-textarea">
      <textarea v-model="remake" auto-height />
    </view>
  </view>
  <view class="car-box">
    <view class="t">
      <text>
        <text>购物车</text>
        <text class="ps">（左滑可移除商品）</text>
      </text>
      <button
        v-if="info && info.list?.length"
        size="mini"
        @click="handleCarOk()"
      >
        确认下单
      </button>
    </view>
    <view class="carinfo" v-if="info && info.list?.length">
      <div class="item-box" v-for="(item, idx) in info.list" :key="idx">
        <uni-swipe-action-item>
          <!-- <template v-slot:left>
            <view><text>置顶</text></view>
          </template> -->
          <view class="item-content">
            <view class="product-info">
              <view>
                <text>名称：</text>
                <text>{{ item.productInfo.title }}</text>
              </view>
              <view class="product-select">
                <text v-for="(itm, index) in item.config" :key="'tm' + index">{{
                  `${itm.name}：${itm.selectList.join("、")}`
                }}</text>
              </view>
            </view>
            <image mode="aspectFill" :src="item.productInfo.thum" />
            <view>
              <text>数量：</text>
              <text>x{{ item.num }}</text>
            </view>
          </view>
          <template v-slot:right>
            <view class="item-del">
              <button size="mini" @click="handleCarDelItem(item, idx)">
                删除
              </button></view
            >
          </template>
        </uni-swipe-action-item>
      </div>
    </view>
    <view v-else class="empty">快去选择好物吧~</view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { CommonModule } from "@/store";
import { findCarInfo, getProductList, addCarInfo, createShop } from "@/api";
const name = computed(() => CommonModule.state.name);
const phone = computed(() => CommonModule.state.phone);
const address = computed(() => CommonModule.state.address);
const info = ref<any>(null);
const remake = ref<string>("");
onShow(async (options) => {
  await init();
});
const init = async () => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const r: any = await findCarInfo({ userId: CommonModule.state.userId });
    if (!r.isValid) return;
    r.data[0].list = JSON.parse(r.data[0].list);
    // 这里再次获取商品数据
    for (let i = 0; i < r.data[0].list.length; i++) {
      const item = r.data[0].list[i];
      const res = await getProductList({ id: item.productId });
      if (!res.isValid) return item;
      item.productInfo = res.data[0];
    }
    info.value = r.data[0];
    console.error(info.value.list);
  } finally {
    uni.hideLoading();
  }
};
const handleToAddress = () => {
  uni.navigateTo({
    url: `/pages/address/index`,
  });
};
const handleCarDelItem = async (item: any, idx: number) => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const r: any = await findCarInfo({ userId: CommonModule.state.userId });
    if (!r.isValid) return;
    r.data[0].list = JSON.parse(r.data[0].list);
    r.data[0].list = r.data[0].list.filter(
      (it) => it.productId != item.productId
    );
    const res: any = await addCarInfo({
      userId: CommonModule.state.userId,
      list: JSON.stringify(r.data[0].list),
    });
    if (!res.isValid) return;
    info.value.list.splice(idx, 1);
    uni.showToast({
      icon: "none",
      mask: true,
      title: "移除成功",
    });
  } finally {
    uni.hideLoading();
  }
};
const handleCarOk = async () => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const r: any = await createShop({
      userId: CommonModule.state.userId,
      status: 0, // 0 待处理 1 处理中 2 处理完成
      isDelete: 0,
      products: JSON.stringify(info.value),
      remark: remake.value,
      date: new Date().getTime() + "",
    });
    if (!r.isValid) return;
    // 下单成功，清楚购物车
    const res: any = await addCarInfo({
      userId: CommonModule.state.userId,
      list: JSON.stringify([]),
    });
    if (!res.isValid) return;
    remake.value = "";
    info.value = null;
    uni.showToast({
      icon: "none",
      mask: true,
      title: "下单成功",
    });
  } finally {
    uni.hideLoading();
  }
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
<style lang="scss"></style>
