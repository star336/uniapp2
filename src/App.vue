<template>
  <u-button>月落</u-button>
</template>
<script>
import UAlertTips from "./uni_modules/vk-uview-ui/components/u-alert-tips/u-alert-tips.vue";

export default {
  components: {UAlertTips},
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
@import "./uni_modules/vk-uview-ui/index.scss";
</style>
