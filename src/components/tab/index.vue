<template>
  <div class="fab-wrapper">
    <block v-for="(item, index) in floatingActionData" :key="index">
      <div
        class="activity"
        :class="{ 'is-select': props.from === item.id }"
        @click="jumpToHomepage(item.target)"
      >
        <img class="icon" :src="item.img" alt="fab-activity" />
        <p class="text">{{ item.title }}</p>
      </div>
    </block>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
interface FloatingActionBarProp {
  from: string;
}
const props = withDefaults(defineProps<FloatingActionBarProp>(), {
  from: "",
});
const floatingActionData = ref<any>([]);
onBeforeMount(() => {
  floatingActionData.value = [
    {
      id: "index",
      title: "首页",
      img: "https://webimg.ziroom.com/5a05d35d-9f33-4c37-a950-77b8be553811.png",
      target: "/pages/index/index",
      params: {},
    },
    {
      id: "list",
      title: "列表",
      img: "https://webimg.ziroom.com/5a05d35d-9f33-4c37-a950-77b8be553811.png",
      target: "/pages/list/index",
      params: {},
    },
  ];
});
const jumpToHomepage = (target: string) => {
  uni.switchTab({
    url: target,
  });
};
</script>
<style lang="scss" scoped>
.fab-wrapper {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1200;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 5px 0;
  .activity {
    flex: 1;
    text-align: center;
    .icon {
      filter: grayscale(0.95);
      -webkit-filter: grayscale(0.95);
      width: 20px;
      height: 20px;
    }
    .text {
      padding-top: 3px;
      font-size: 10px;
      color: $yr-theme-font-color;
    }
  }
  .activity.is-select {
    .icon {
      filter: grayscale(0);
      -webkit-filter: grayscale(0);
    }
  }
}
</style>
