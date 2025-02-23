<template>
  <view class="custom-toast z-50" :style="{ width: width + 'px', height: height + 'px' }">
    <text>{{ message }}</text>
  </view>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 100
    }
  }
};
</script>

<style scoped>
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
</style>