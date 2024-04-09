<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
wx-swiper .wx-swiper-dot {
  width: 20rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background-color: #ffffff;
  opacity: 0.8;
}
wx-swiper .wx-swiper-dot-active {
  background-color: #ffffff;
  width: 64rpx;
  height: 8rpx;
  border-radius: 4rpx;
}
.uni-popup.bottom {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
}
</style>
