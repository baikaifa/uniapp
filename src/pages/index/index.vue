<template>
  <view class="content">
    <view class="top-bar">
      <image
        src="https://webimg.ziroom.com/13c69df0-a462-4967-8766-324542ff0193.png"
      />
      <view>首页</view>
    </view>
    <view class="swiper-box">
      <view class="top-bar-sub"> </view>
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
    <!-- icon 入口 -->
    <view class="cat-item">
      <view class="item" data-sts="1" @tap="toClassifyPage">
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>新品推荐</text>
      </view>
      <view class="item" data-sts="1" @tap="toClassifyPage">
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>限时特惠</text>
      </view>
      <view class="item" data-sts="3" @tap="toClassifyPage">
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>每日疯抢</text>
      </view>
      <view class="item" @tap="toCouponCenter">
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>领优惠券</text>
      </view>
    </view>
    <!-- 上新商品展示 -->
    <view class="content-box">
      <view class="l">
        <view>新品好物</view>
        <swiper
          class="swiper"
          circular
          :indicator-dots="true"
          :autoplay="false"
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
      <view class="r">
        <view>种类排行</view>
        <view class="top2">
          <view>
            <image
              src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
            />
            <view>商品:电视</view>
            <view>商品:电视</view>
            <view>商品:电视</view>
          </view>
          <view>
            <image
              src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
            />
            <view>商品:冰箱</view>
            <view>商品:冰箱</view>
            <view>商品:冰箱</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 案例 -->
    <!-- <scroll-view scroll-x class="border-bottom scroll-row">
          <view class="scroll-view-item">
            <image
              src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
            />
          </view>
          <view class="scroll-view-item">
            <image
              src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
            />
          </view>
        </scroll-view> -->
    <!-- 长列表 -->
    <view class="long-list">
      <view> 商品 </view>
      <view> 其他 </view>
    </view>
    <view class="lone-list-item">
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
      <view class="list-card">
        <image
          src="https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg"
        />
        <view>商品:电视</view>
        <view>商品:电视</view>
        <view>商品:电视</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const title = ref("Hello");
const tabIndex = ref(0);
const tabbbars = reactive([
  {
    name: "推荐",
  },
  {
    name: "关注",
  },
  {
    name: "体育",
  },
  {
    name: "热点",
  },
  {
    name: "财经",
  },
  {
    name: "娱乐",
  },
  {
    name: "娱乐",
  },
  {
    name: "娱乐",
  },
  {
    name: "娱乐",
  },
]);
const scrollinto = () => {};
const toClassifyPage = () => {};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
