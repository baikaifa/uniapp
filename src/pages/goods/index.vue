<template>
  <view class="content">
    <view class="title">
      <image src="../../static/icon/success.png" />
      订单{{ formatStatus(info.status) }}
    </view>
    <view class="sub-title" v-if="info.remark">{{ info.remark }}</view>
    <view class="goods-info">
      <view
        class="goods"
        v-for="(item, index) in info.products.list"
        :key="index"
      >
        <image mode="aspectFill" :src="item.productInfo.thum" />
        <view class="info">
          <view v-for="(itm, idx) in item.config" :key="'t' + idx">{{
            `${itm.name}：${itm.selectList.join(",")}`
          }}</view>
          <view>数量：x{{ item.num }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getShopId } from "@/api";
import { formatStatus } from "@/utils";

const detailId = ref("");
const info = ref<any>(null);
onLoad(async (options: any) => {
  detailId.value = options.detailId;
  await init();
});
const init = async () => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const res: any = await getShopId({ id: detailId.value });
    if (!res.isValid) return;
    res.data[0].products = JSON.parse(res.data[0].products);
    info.value = res.data[0];
  } finally {
    uni.hideLoading();
  }
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
