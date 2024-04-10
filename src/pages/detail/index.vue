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
        <swiper-item>
          <view class="swiper-item uni-bg-red">
            <image
              mode="center"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">
            <image
              mode="center"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">
            <image
              mode="center"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="info-box">
      <!-- 商品标签属性 -->
      <view class="tag">
        <view>
          <view> 售价：<text class="big">1580元</text> </view>
          <view class="ys">已售：150件</view>
        </view>
        <text>舒适</text>
        <text>透气</text>
        <text>性价比</text>
      </view>
      <!-- 商品名称 -->
      <view class="title">
        适用于2023新款AirPodspro2 type-c 软壳登山扣荔枝纹无限耳机保护套
      </view>
      <!-- 商品详情 -->
      <view class="info">
        <view class="sub-title">参数：</view>
        <view class="config-info">
          <view>材料：xxx</view>
          <view>参数信息：xxx</view>
          <view>参数信息：xxx</view>
          <view>参数信息：xxx</view>
        </view>
      </view>
      <!-- 商品简介 配置 -->
      <view class="intro">
        <view class="sub-title">商品介绍：</view>
        <image
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <image
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <image
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
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
        <view v-for="(itm, idx) in detailInfo" :key="'td' + idx" class="select">
          <text class="label">{{ itm.title }}：</text>
          <view class="radio-box">
            <block v-for="(item, index) in itm.list" :key="index">
              <view
                :class="[index === itm.selectIndex ? 'selected' : '', 'item']"
                @click="handleSelect(idx, index)"
                >{{ item.name }}
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
import { ref, onBeforeMount, reactive } from "vue";
const popup: any = ref(null);
const form = reactive({
  num: 1,
});
const detailInfo = ref([
  {
    title: "颜色",
    selectIndex: 0,
    list: [
      { name: "红色", value: "1" },
      { name: "绿色", value: "1" },
      {
        name: "我是超多文本，我是超多文本，我是超多文本，我是超多文本",
        value: "1",
      },
      { name: "蓝色", value: "1" },
    ],
  },
  {
    title: "尺码",
    selectIndex: 0,
    list: [
      { name: "1米", value: "1" },
      { name: "2米", value: "1" },
      { name: "3米", value: "1" },
    ],
  },
  {
    title: "颜色1",
    selectIndex: 0,
    list: [
      { name: "红色", value: "1" },
      { name: "绿色", value: "1" },
      {
        name: "我是超多文本，我是超多文本，我是超多文本，我是超多文本",
        value: "1",
      },
      { name: "蓝色", value: "1" },
    ],
  },
  {
    title: "容量",
    selectIndex: 0,
    list: [
      { name: "1L", value: "1" },
      { name: "10L", value: "1" },
      { name: "11L", value: "1" },
    ],
  },
]);
onBeforeMount(() => {});
const joinShopp = () => {
  popup.value.open("bottom");
};
const moveHandle = () => {};
const closePopup = () => {
  popup.value.close();
};
const submit = () => {
  uni.showToast({
    icon: "none",
    mask: true,
    title: "我要提交啦",
  });
};
const radioChange = () => {};
const handleSelect = (idx: number, index: number) => {
  detailInfo.value[idx].selectIndex = index;
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
