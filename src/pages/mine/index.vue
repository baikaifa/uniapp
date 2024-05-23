<template>
  <view class="container">
    <view class="avatar">
      <image mode="center" :src="avatarUrl" />
      <view @click="handleLogin">登录/注册</view>
    </view>
    <view class="banner">
      <view>
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>新品推荐</text>
      </view>
      <view>
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>新品推荐</text>
      </view>
      <view>
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>新品推荐</text>
      </view>
      <view>
        <image
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <text>新品推荐</text>
      </view>
    </view>
    <view class="mine">
      <view class="card">
        <view class="title">订单</view>
        <view class="goods-list">
          <view class="more">
            <view class="l">
              <view class="date">创建时间：2024-02-02 15:20</view>
              <view class="state consult">待咨询</view>
            </view>
            <view class="r" @click="toDetail('12')">
              查看详情
              <image src="../../static/icon/right.png" />
            </view>
          </view>
          <scroll-view scroll-x="true" class="goods">
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </scroll-view>
        </view>
        <view class="goods-list">
          <view class="more">
            <view class="l">
              <view class="date">创建时间：2024-02-02 15:20</view>
              <view class="state">已完成</view>
            </view>
            <view class="r" @click="toDetail('12')">
              查看详情
              <image src="../../static/icon/right.png" />
            </view>
          </view>
          <scroll-view scroll-x="true" class="goods">
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </scroll-view>
        </view>
        <view class="goods-list">
          <view class="more">
            <view class="l">
              <view class="date">创建时间：2024-02-02 15:20</view>
              <view class="state">已完成</view>
            </view>
            <view class="r" @click="toDetail('12')">
              查看详情
              <image src="../../static/icon/right.png" />
            </view>
          </view>
          <scroll-view scroll-x="true" class="goods">
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
            <image
              mode="heightFix"
              src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
            />
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getUserInfo } from "@/api/index";
const avatarUrl = ref(
  "https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
);
const toDetail = (detailId: string) => {
  uni.navigateTo({
    url: `/pages/goods/index?detailId=${detailId}`,
  });
};
const handleLogin = () => {
  uni.login({
    success: async (data) => {
      const { errMsg, code } = data;
      const res = await getUserInfo({ code });
      console.log(res);
    },
    fail: (e) => {
      console.log(e);
    },
  });
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
