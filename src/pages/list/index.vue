<template>
  <view class="container">
    <scroll-view scroll-y="true" class="l">
      <block v-for="(item, index) in sortList" :key="index">
        <view
          :class="[index === currentTabIndex ? 'active' : '']"
          @click="handleTag(index)"
          >{{ item.name }}</view
        >
      </block>
    </scroll-view>
    <scroll-view
      scroll-y="true"
      class="r"
      :scroll-top="scrollTop"
      @scroll="scroll"
    >
      <block v-for="(item, index) in card" :key="index">
        <view class="card">
          <view class="card-title">{{ item[0].subTitle }}</view>
          <view class="card-info-box">
            <block v-for="(itm, idx) in item" :key="'info' + idx">
              <view class="card-info">
                <view class="card-item">
                  <image mode="center" :src="itm.img" />
                  <view>{{ itm.title }}</view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed, nextTick } from "vue";
const scrollTop = ref(0);
const scrollTopOld = reactive({
  scrollTop: 0,
});
const currentTabIndex = ref(0);
const sortList = reactive<any[]>([
  {
    name: "冰箱",
    id: 1,
  },
  {
    name: "彩电",
    id: 1,
  },
  {
    name: "大沙发",
    id: 1,
  },
  {
    name: "衣柜",
    id: 1,
  },
  {
    name: "橱柜",
    id: 1,
  },
  {
    name: "热水器",
    id: 1,
  },
]);
const currentCard = reactive<any[]>([
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题",
    title: "新风冰箱1",
    detailId: "123",
  },
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题",
    title: "新风冰箱2",
    detailId: "123",
  },
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题",
    title: "新风冰箱3",
    detailId: "123",
  },
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题1",
    title: "1匹挂机1",
    detailId: "123",
  },
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题1",
    title: "1匹挂机2",
    detailId: "123",
  },
  {
    img: "https://webimg.ziroom.com/9a2b9afa-e4a8-4516-9f0e-95a3e55071cb.jpg",
    subTitle: "副标题1",
    title: "1匹挂机3",
    detailId: "123",
  },
]);
const card = computed(() => {
  const temp = [];
  currentCard.forEach((itm) => {
    const idx = temp.findIndex((item) => item[0].subTitle === itm.subTitle);
    if (idx !== -1) {
      temp[idx].push(itm);
    } else {
      temp.push([itm]);
    }
  });
  return temp;
});
const scroll = (e: any) => {
  scrollTopOld.scrollTop = e.detail.scrollTop;
};
const handleTag = (index: number) => {
  currentTabIndex.value = index;
  currentCard.value = currentCard.reverse();
  scrollTop.value = scrollTopOld.scrollTop;
  nextTick(() => {
    scrollTop.value = 0;
    console.log("pppppp");
  });
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
