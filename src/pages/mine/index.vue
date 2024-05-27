<template>
  <view class="container">
    <view class="avatar">
      <image :src="avatarUrl" />
      <view @click="handleLogin">{{ nickName }}</view>
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
        <view class="goods-box" v-if="shopList.length">
          <view
            class="goods-list"
            v-for="(item, index) in shopList"
            :key="index"
          >
            <view class="more">
              <view class="l">
                <view class="date" v-if="item.date"
                  >创建时间：{{ formatDate(item.date) }}</view
                >
                <view
                  :class="[
                    'state',
                    item.status === 1
                      ? 'consult'
                      : item.status === 2
                      ? 'finish'
                      : '',
                  ]"
                  >{{ formatStatus(item.status) }}</view
                >
              </view>
              <view class="r" @click="toDetail(item)">
                查看详情
                <image src="../../static/icon/right.png" />
              </view>
            </view>
            <scroll-view scroll-x="true" class="goods">
              <image
                v-for="(itm, idx) in item.products.list"
                mode="aspectFill"
                :src="itm.productInfo.thum"
              />
            </scroll-view>
          </view>
        </view>
        <!-- <view class="goods-list">
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
        </view> -->
        <view class="empty" v-else>暂无订单</view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getUserInfo, getShopList } from "@/api/index";
import { formatDate, formatStatus } from "@/utils";
import { CommonModule } from "@/store";
const avatarUrl = ref(
  "https://phpimg.ziroom.com/9f9d0535-b39e-432e-9f84-b08ac221c6ed.jpg"
);
const openId = computed(() => CommonModule.state.openId);
const phone = computed(() => CommonModule.state.phone);
const userId = computed(() => CommonModule.state.userId);
const nickName = computed(() => {
  if (phone.value) {
    return phone.value.slice(0, 3) + "****" + phone.value.slice(7, 11);
  }
  if (openId.value) {
    return "填写信息";
  }
  return "登录/注册";
});
const shopList = ref<any>([]);
onShow(async () => {
  await init();
});
const init = async () => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const res = await getShopList({ userId: userId.value });
    if (!res.isValid) return;
    shopList.value = res.data
      .map((item) => {
        item.products = JSON.parse(item.products);
        return item;
      })
      .reverse();
  } finally {
    uni.hideLoading();
  }
};
// const formatDate = (date: string) => {
//   const t = new Date(Number(date));
//   console.error(t);
//   return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日`;
// };
// const formatStatus = (status: 0 | 1 | 2) => {
//   let t = "";
//   switch (status) {
//     case 0:
//       t = "待处理";
//       break;
//     case 1:
//       t = "处理中";
//       break;
//     case 2:
//       t = "已完成";
//       break;
//   }
//   return t;
// };
const toDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/goods/index?detailId=${item.id}`,
  });
};
const handleLogin = () => {
  if (openId.value) {
    // if (!phone.value) {
    uni.navigateTo({
      url: `/pages/address/index`,
    });
    // }
    return;
  }
  uni.login({
    success: async (data) => {
      const { errMsg, code } = data;
      const res: any = await getUserInfo({ code });
      console.log(res);
      if (!res.isValid) return;
      CommonModule.action.setUserInfo({ userId: res.data.id, ...res.data });
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
