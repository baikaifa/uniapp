<template>
  <view class="container">
    <scroll-view scroll-y="true" class="l">
      <block v-for="(item, index) in sortList" :key="index">
        <view
          :class="[index === currentTabIndex ? 'active' : '']"
          @click="handleTag(index)"
          >{{ item.title }}</view
        >
      </block>
    </scroll-view>
    <scroll-view
      scroll-y="true"
      class="r"
      :scroll-top="scrollTop"
      @scroll="scroll"
    >
      <view class="r-main" v-if="card.length">
        <block v-for="(item, index) in card" :key="index">
          <uni-collapse>
            <view class="card">
              <!-- <view class="card-title">{{ item[0].sort2Name }}11</view> -->
              <uni-collapse-item :title="item[0].sort2Name">
                <view class="card-info-box">
                  <block
                    v-for="(itm, idx) in item"
                    :key="'info' + idx + '-' + index"
                  >
                    <view class="card-info">
                      <view class="card-item" @click="toProductDetail(itm.id)">
                        <image :src="itm.thum" />
                        <view>{{ itm.title }}</view>
                      </view>
                    </view>
                  </block>
                </view>
              </uni-collapse-item>
            </view>
          </uni-collapse>
        </block>
      </view>
      <view class="r-main empty" v-else>
        <text>商品待上架</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed, nextTick, onBeforeMount, watch } from "vue";
import uniCollapse from "@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue";
import { getSortList, getProductList } from "@/api";
const scrollTop = ref(0);
const scrollTopOld = reactive({
  scrollTop: 0,
});
const currentTabIndex = ref(0);
const sortList = ref<any[]>([]);
const currentCard = ref<any[]>([]);
const card = computed(() => {
  const temp: any[] = [];
  currentCard.value.forEach((itm) => {
    const idx = temp.findIndex((item) => item[0].sort2Name === itm.sort2Name);
    if (idx !== -1) {
      temp[idx].push(itm);
    } else {
      temp.push([itm]);
    }
  });
  // 排序
  temp.forEach((item) => {
    item = item.sort((a: any, b: any) => a.psort - b.psort);
  });
  return temp.sort((a, b) => a[0].sort2sort - b[0].sort2sort);
});
watch(
  () => currentTabIndex.value,
  async (v1, v2) => {
    if (v1 === v2) return;
    await getCurrentProductList();
  }
);
const scroll = (e: any) => {
  scrollTopOld.scrollTop = e.detail.scrollTop;
};
const handleTag = (index: number) => {
  currentTabIndex.value = index;
  scrollTop.value = scrollTopOld.scrollTop;
  nextTick(() => {
    scrollTop.value = 0;
  });
};
const toProductDetail = (productId: string) => {
  uni.navigateTo({
    url: `/pages/detail/index?productId=${productId}`,
  });
  0;
};
onBeforeMount(async () => {
  await init();
  if (!sortList.value.length) return;
  await getCurrentProductList();
});
const init = async () => {
  try {
    uni.showLoading({
      title: "请稍后...",
      mask: true,
    });
    const res: any = await getSortList({ level: 1 });
    if (!res.isValid) return;
    sortList.value = res.data;
  } finally {
    uni.hideLoading();
  }
};
const getCurrentProductList = async () => {
  currentCard.value = [];
  nextTick(async () => {
    try {
      uni.showLoading({
        title: "请稍后...",
        mask: true,
      });
      const r: any = await getProductList({
        sort1: sortList.value[currentTabIndex.value].id,
      });
      if (!r.isValid) return;
      currentCard.value = r.data;
    } finally {
      uni.hideLoading();
    }
  });
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
<style lang="scss">
.uni-collapse-item__title-text {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.uni-collapse-item__title.uni-collapse-item-border,
.uni-collapse-item__wrap-content {
  border-bottom: none !important;
}
</style>
