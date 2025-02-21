<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <view class="title bg-amber-600 underline">{{ title }}</view>
    </view>
  </view>

</template>

<script>
import UButton from "vk-uview-ui/components/u-button/u-button.vue";
import UAlertTips from "vk-uview-ui/components/u-alert-tips/u-alert-tips.vue";

export default {
  components: {UAlertTips, UButton},
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {
  },
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
