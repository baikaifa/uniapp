<template>
  <view class="content">
    <view class="swiper-box">
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        :autoplay="true"
        :interval="5000"
        :duration="500"
      >
        <swiper-item v-for="(item, idx) in detailInfo.imgs" :key="idx">
          <view class="swiper-item uni-bg-red">
            <image mode="center" :src="item.url" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="info-box">
      <!-- 商品标签属性 -->
      <view class="tag">
        <view>
          <!-- <view> 售价：<text class="big">待议</text> </view> -->
          <view class="title">{{ detailInfo.showTitle }}</view>
          <view class="ys">已售：{{ detailInfo.sellNum }}件</view>
        </view>
        <text v-for="(itm, idx) in detailInfo.tags" :key="'tag' + idx">{{
          itm
        }}</text>
      </view>
      <!-- 商品名称 -->
      <view class="title">
        {{ detailInfo.subTitle }}
      </view>
      <!-- 商品详情 -->
      <!-- <view class="info">
        <view class="sub-title">参数：</view>
        <view class="config-info">
          <view>材料：xxx</view>
          <view>参数信息：xxx</view>
          <view>参数信息：xxx</view>
          <view>参数信息：xxx</view>
        </view>
      </view> -->
      <!-- 商品简介 配置 -->
      <view class="intro">
        <view class="sub-title">商品介绍：</view>
        <view v-html="detailInfo.info"></view>
      </view>
      <!-- 加入购物车 -->
      <view class="shopp-box">
        <text @click="joinShopp">加入订单</text>
      </view>
    </view>
  </view>
  <uni-popup
    ref="popup"
    class="popup-container"
    type="bottom"
    background-color="#fff"
    border-radius="10px 10px 0 0"
    @touchmove.stop.prevent="moveHandle"
  >
    <view class="popup-main">
      <image
        class="close"
        @click="closePopup"
        src="../../static/icon/close.png"
      />
      <scroll-view scroll-y="true" class="scroll-submit">
        <view
          v-for="(itm, idx) in detailInfo.config"
          :key="'td' + idx"
          class="select"
        >
          <text class="label">{{ itm.name }}：</text>
          <view class="radio-box">
            <block v-for="(item, index) in itm.list" :key="index">
              <view
                :class="[
                  itm?.selectIndex && itm?.selectIndex.includes(index)
                    ? 'selected'
                    : '',
                  'item',
                ]"
                @click="handleSelect(itm.isMultiple, idx, index)"
                >{{ item }}
              </view>
            </block>
          </view>
        </view>
        <view class="num">
          <text class="label">数量：</text>
          <input type="number" v-model="form.num" />
        </view>
        <view class="empty"></view>
      </scroll-view>
      <view class="shopp-box"><text @click="submit">加入订单</text></view>
    </view>
  </uni-popup>
</template>
<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { ref, reactive } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { CommonModule } from "@/store";

import { getProductList, findCarInfo, addCarInfo } from "@/api";
const popup: any = ref(null);
const form = reactive({
  num: 1,
});
const userId = ref("");
const productId = ref("");
const detailInfo = ref<any>([]);
onLoad(async (options: any) => {
  productId.value = options.productId;
  // CommonModule.action.setUserInfo({
  //   userId: "2",
  //   phone: "123123",
  //   openId: "xxx",
  //   address: "uuuu",
  // });
  // console.error(CommonModule.state.userId);
  await init(options.productId);
});
onShow(() => {});
const init = async (id: string) => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const res: any = await getProductList({ id });
    if (!res.isValid) return;
    const t = res.data[0];
    t.tags = JSON.parse(t.tags);
    t.imgs = JSON.parse(t.imgs);
    t.config = JSON.parse(t.config);
    detailInfo.value = res.data[0];
  } finally {
    uni.hideLoading();
  }
};
const joinShopp = () => {
  popup.value.open("bottom");
};
const moveHandle = () => {};
const closePopup = () => {
  popup.value.close();
};
const submit = async () => {
  // uni.showToast({
  //   icon: "none",
  //   mask: true,
  //   title: "我要提交啦",
  // });
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const t = [];
    let isF = false;
    // detailInfo.value.config.forEach(item=>{
    //   if()
    // })
    for (let i = 0; i < detailInfo.value.config.length; i++) {
      const c = detailInfo.value.config[i];
      if (!c.selectIndex || c.selectIndex.length === 0) {
        uni.showToast({
          icon: "none",
          mask: true,
          title: `请选择${c.name}`,
        });
        isF = true;
        break;
      } else {
        t.push({
          name: c.name,
          selectList: c.list.filter((item, idx) => c.selectIndex.includes(idx)),
        });
      }
    }
    if (isF) return;
    if (form.num <= 0) {
      uni.showToast({
        icon: "none",
        mask: true,
        title: "请选择正确的商品数量",
      });
      return;
    }
    const r: any = await findCarInfo({ userId: CommonModule.state.userId });
    if (!r.isValid) return;
    r.data[0].list = JSON.parse(r.data[0].list);
    const info = r.data[0];
    // 不可以重复添加同一个商品
    const findIdx = info.list.findIndex(
      (item) => item.productId === productId.value
    );
    if (findIdx !== -1) {
      uni.showToast({
        icon: "none",
        mask: true,
        title: "当前商品已在购物车中，如需更改请在购物车移除再重新添加",
      });
      return;
    }
    info.list.unshift({
      productId: productId.value,
      config: t,
      num: form.num,
    });
    const res = await addCarInfo({
      userId: CommonModule.state.userId,
      list: JSON.stringify(info.list),
    });
    if (!res.isValid) return;
    uni.showToast({
      icon: "none",
      mask: true,
      title: "已添加至购物车",
    });
  } finally {
    uni.hideLoading();
  }
};
const handleSelect = (isMultipleidx: boolean, idx: number, index: number) => {
  let temp = JSON.parse(
    JSON.stringify(detailInfo.value.config[idx].selectIndex || [])
  );
  if (isMultipleidx) {
    // 多选
    const t = temp.findIndex((itm: number) => itm === index);
    if (t !== -1) {
      // 移除
      temp.splice(t, 1);
    } else {
      temp.push(index);
    }
  } else {
    // 单选
    temp = [index];
  }
  detailInfo.value.config[idx].selectIndex = [...temp];
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
