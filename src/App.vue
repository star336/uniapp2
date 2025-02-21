<script>
import UAlertTips from "vk-uview-ui/components/u-alert-tips/u-alert-tips.vue";


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
  @import "vk-uview-ui/index.scss";
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
