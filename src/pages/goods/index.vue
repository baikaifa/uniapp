<template>
  <view class="content">
    <view class="title">
      <image src="../../static/icon/success.png" />
      订单已完成
    </view>
    <view class="sub-title">我的备注信息</view>
    <view class="goods-info">
      <view class="goods">
        <image
          mode="widthFix"
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <view class="info">
          <view>型号：256GB</view>
          <view>数量：x1</view>
          <view>颜色：海蓝色</view>
          <view>沟通状态：已完成</view>
          <view>创建时间：2024-02-02</view>
        </view>
      </view>
      <view class="goods">
        <image
          mode="widthFix"
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <view class="info">
          <view>型号：256GB</view>
          <view>数量：x1</view>
          <view>颜色：海蓝色</view>
          <view>沟通状态：已完成</view>
          <view>创建时间：2024-02-02</view>
        </view>
      </view>
      <view class="goods">
        <image
          mode="widthFix"
          src="https://webimg.ziroom.com/99b3f4e3-9267-4c36-b1ac-a2360b7218fe.png"
        />
        <view class="info">
          <view>型号：256GB</view>
          <view>数量：x1</view>
          <view>颜色：海蓝色</view>
          <view>沟通状态：已完成</view>
          <view>创建时间：2024-02-02</view>
        </view>
      </view>
      <view class="goods">
        <image
          mode="widthFix"
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <view class="info">
          <view>型号：256GB</view>
          <view>数量：x1</view>
          <view>颜色：海蓝色</view>
          <view>沟通状态：已完成</view>
          <view>创建时间：2024-02-02</view>
        </view>
      </view>
      <view class="goods">
        <image
          mode="widthFix"
          src="https://webimg.ziroom.com/77d7708f-7684-4336-8d49-829417397893.jpg"
        />
        <view class="info">
          <view>型号：256GB</view>
          <view>数量：x1</view>
          <view>颜色：海蓝色</view>
          <view>沟通状态：已完成</view>
          <view>创建时间：2024-02-02</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const detailId = ref("");
onLoad((options: any) => {
  detailId.value = options.detailId;
});
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
