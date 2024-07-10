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
          <view class="card">
            <view class="card-title">{{ item[0].sort2Name }}</view>
            <view class="card-info-box">
              <block v-for="(itm, idx) in item" :key="'info' + idx">
                <view class="card-info">
                  <view class="card-item" @click="toProductDetail(itm.id)">
                    <image :src="itm.thum" />
                    <view>{{ itm.title }}</view>
                  </view>
                </view>
              </block>
            </view>
          </view>
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
  return temp;
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
  currentCard.value = currentCard.value.reverse();
  scrollTop.value = scrollTopOld.scrollTop;
  nextTick(() => {
    scrollTop.value = 0;
  });
};
const toProductDetail = (productId: string) => {
  uni.navigateTo({
    url: `/pages/detail/index?productId=${productId}`,
  });
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
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
