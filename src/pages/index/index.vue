<template>
  <view class="content">
    <view class="top-bar">
      <view>首页</view>
    </view>
    <!-- <view class="con-part2-con">
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      <swiper
        class="swiper-tall"
        circular
        previous-margin="260rpx"
        current="0"
        @change="partSwiperChange"
      >
        <swiper-item
          class="con-part2-con-container"
          v-for="(item, index) in partSwiperChangeList"
          :key="index"
        >
          <view
            :class="['slide-image', partcurrentIndex === index ? 'active' : '']"
            :style="{
              background: 'url(' + item.pic + ') center no-repeat',
              backgroundSize: '100%',
            }"
          >
            <view class="part2-con-img">
              <image :src="item.img" class="img"></image>
            </view>
            <view class="part2-con-title">{{ item.title }}</view>
          </view>
        </swiper-item>
      </swiper>
    </view> -->

    <view class="swiper-box">
      <!-- <view class="top-bar-sub"> </view> -->
      <swiper
        class="swiper"
        circular
        :autoplay="true"
        :interval="5000"
        :duration="500"
        previous-margin="30"
        next-margin="30"
        :indicator-dots="true"
        :disable-touch="list.swiperList.length === 1"
        @change="partSwiperChange"
      >
        <swiper-item
          :class="['swiper-item', partcurrentIndex === index ? 'active' : '']"
          v-for="(item, index) in list.swiperList"
          :key="index"
          @click="toProductDetail(item.id)"
        >
          <view :class="['slide-box']">
            <view class="slide-image">
              <image mode="aspectFill" :src="item.thum" />
            </view>
            <view class="slide-tip">
              <view class="s1">{{ item.showTitle }}</view>
              <view class="s2">{{ item.subTitle }}</view>
              <view class="s3">
                {{ `${partcurrentIndex + 1}/${list.swiperList.length}` }}
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- icon -->
    <view class="icon-box">
      <view class="icon-item">
        <image
          class="icon-big"
          mode="aspectFill"
          src="../../static/home/f1.png"
        />
        <text>大师作品</text>
      </view>
      <view class="icon-item">
        <image
          class="icon-big"
          mode="aspectFill"
          src="../../static/home/f2.png"
        />
        <text>免费安装</text>
      </view>
      <view class="icon-item">
        <image mode="aspectFill" src="../../static/home/f3.png" />
        <text>无忧售后</text>
      </view>
      <view class="icon-item">
        <image mode="aspectFill" src="../../static/home/f4.png" />
        <text>万款产品</text>
      </view>
    </view>
    <view class="bg-box">
      <image mode="widthFix" src="../../static/home/b1.jpg" />
    </view>
    <view class="list-box">
      <view class="list-item item1" @click="toTypeDetail(1)">
        <view>
          <text class="t1">客厅</text>
          <text class="t2">LIVING ROOM</text>
        </view>
        <image mode="widthFix" src="../../static/home/i1.png" />
      </view>
      <view class="list-item item2" @click="toTypeDetail(2)">
        <view>
          <text class="t1">餐厅</text>
          <text class="t2">RESTAURANT</text>
        </view>
        <image mode="widthFix" src="../../static/home/i2.png" />
      </view>
      <view class="list-item item3" @click="toTypeDetail(3)">
        <view>
          <text class="t1">卧室</text>
          <text class="t2">BED ROOM</text>
        </view>
        <image mode="widthFix" src="../../static/home/i3.png" />
      </view>
      <view class="list-item item4" @click="toTypeDetail(4)">
        <view>
          <text class="t1">书房</text>
          <text class="t2">STUDY</text>
        </view>
        <image mode="widthFix" src="../../static/home/i4.png" />
      </view>
      <view class="list-item item5" @click="toTypeDetail(5)">
        <view>
          <text class="t1">茶室</text>
          <text class="t2">TEA ROOM</text>
        </view>
        <image mode="widthFix" src="../../static/home/i5.png" />
      </view>
      <view class="list-item item6" @click="toTypeDetail(6)">
        <view>
          <text class="t1">全部</text>
          <text class="t2">WHOLE</text>
        </view>
        <image mode="widthFix" src="../../static/home/i6.png" />
      </view>
    </view>
    <view class="bg-box">
      <image mode="widthFix" src="../../static/home/b2.png" />
    </view>
    <!-- 现货特价 -->
    <view class="product-list">
      <view>
        <view class="title">现货特价</view>
        <view class="sub_title">限时打折新品，过时恢复原价</view>
      </view>
      <scroll-view class="product-swiper" scroll-x="true" scroll-left="-40">
        <view
          :class="['swiper-item']"
          v-for="(item, index) in list.CheapPriceList"
          :key="index"
          @click="toProductDetail(item.id)"
        >
          <view :class="['slide-box']">
            <view class="slide-image">
              <image :src="item.thum" />
            </view>
            <view class="slide-tip">
              <view class="s1">{{ item.showTitle }}</view>
              <view class="s2">￥{{ item.price }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 新品专区 -->
    <view class="product-list last">
      <view>
        <view class="title">新品专区</view>
        <view class="sub_title">每周新品推荐</view>
      </view>
      <scroll-view class="product-swiper" scroll-x="true" scroll-left="-40">
        <view
          :class="['swiper-item']"
          v-for="(item, index) in list.newProductList"
          :key="index"
          @click="toProductDetail(item.id)"
        >
          <view :class="['slide-box']">
            <view class="slide-image">
              <image :src="item.thum" />
            </view>
            <view class="slide-tip">
              <view class="s1">{{ item.showTitle }}</view>
              <view class="s2">{{ item.subTitle }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- <view class="html-content" v-html="formatHTML(homeInfo.html)"></view> -->
  </view>
</template>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance } from "vue";
import { getHomeList, getProductList } from "@/api";
import { onLoad } from "@dcloudio/uni-app";
import { formatHTML } from "@/utils";
// const that = getCurrentInstance();
// const query = uni.createSelectorQuery().in(that);
const tabIndex = ref(0);
const scrollTopPage = ref(0);
const scrollTop1 = ref(0);
const scrollTop2 = ref(0);
const homeInfo = ref<any>(null);
// new
const list = reactive<any>({
  swiperList: [],
  CheapPriceList: [],
  newProductList: [],
});
const partcurrentIndex = ref(0);

const scrollinto = () => {};
const toClassifyPage = () => {};
const handleTab = (num: number) => {
  tabIndex.value = num;
  return;
  scrollInfo(num);
};
const scrollInfo = (num: number) => {
  if (num === 0) {
    scrollTop1.value = scrollTopPage.value;
    uni.pageScrollTo({
      scrollTop: scrollTop2.value,
      duration: 0,
    });
  } else if (num === 1) {
    scrollTop2.value = scrollTopPage.value;
    uni.pageScrollTo({
      scrollTop: scrollTop1.value,
      duration: 0,
    });
  }
};
const handleScroll = (e: any) => {
  console.log(e.detail.scrollTop);
};
onLoad(async (options: any) => {
  await init();
});
onPageScroll((e: any) => {
  scrollTopPage.value = e.scrollTop;
});
const init = async () => {
  const resList: any = await Promise.all([
    await getProductList({ isHomeSwiper: 1 }),
    await getProductList({ isHomeCheap: 1 }),
    await getProductList({ isHomeNewProduct: 1 }),
  ]);
  console.log(resList);
  if (resList[0].isValid) {
    list.swiperList = [
      ...resList[0].data.sort((a, b) => a.homeSwiperNum - b.homeSwiperNum),
    ];
  }
  if (resList[1].isValid) {
    list.CheapPriceList = resList[1].data.sort(
      (a, b) => a.homeCheapNum - b.homeCheapNum
    );
  }
  if (resList[2].isValid) {
    list.newProductList = resList[2].data.sort(
      (a, b) => a.homeNewProductNum - b.homeNewProductNum
    );
  }
  console.log(list);
};
const partSwiperChange = (event: any) => {
  partcurrentIndex.value = event.detail.current;
};
const toProductDetail = (productId: string) => {
  uni.navigateTo({
    url: `/pages/detail/index?productId=${productId}`,
  });
};
const toTypeDetail = (type: number) => {
  switch (type) {
    case 1:
      // 跳转沙发
      uni.setStorageSync("listType", 0);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
    case 2:
      // 跳转餐桌
      uni.setStorageSync("listType", 4);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
    case 3:
      // 跳转床头
      uni.setStorageSync("listType", 7);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
    case 4:
      // 跳转中岛
      uni.setStorageSync("listType", 5);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
    case 5:
      // 跳转茶几
      uni.setStorageSync("listType", 1);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
    case 6:
      // 跳转默认第一项
      uni.setStorageSync("listType", 0);
      uni.switchTab({
        url: `/pages/list/index`,
      });
      break;
  }
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
