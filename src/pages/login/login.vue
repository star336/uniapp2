<template>
  <view class="page-container  h-screen overflow-y-auto">
    <view class="scroll-container">
      <view class="h-20 bg-amber-100" v-if="show" @click="toggleShow">

      </view>

      <view class="bg-yellow-950 h-screen scroll-container flex justify-center items-center">
        <view class="bg-green-100 h-3/5 w-4/5 flex gap-x-0">
          <view class="bg-blue-200 h-full w-1/5">
            A
          </view>
          <view class="bg-yellow-100 h-full w-1/5 ml-[calc(1/15*100%)]">
            B
          </view>
          <view class="bg-yellow-200 h-full w-2/5 ml-[calc(2/15*100%)]">
            <u-field
                v-model="account"
                label="账号"
                placeholder="请填账号"
            >
            </u-field>

            <u-field
                v-model="password"
                label="密码"
                placeholder="请填写密码"
            >
            </u-field>
            <u-button type="primary">登陆</u-button>
            <u-button type="primary">1</u-button>
            <u-button type="primary">2</u-button>
            <u-button type="primary">3</u-button>
            <u-button type="primary">设置数量</u-button>
            <u-button type="primary">开始计时</u-button>
            <u-button type="primary">next</u-button>
            <u-button type="primary">switch</u-button>
            <u-button type="primary">finish</u-button>
            <u-button type="primary">zero</u-button>
          </view>
        </view>
      </view>
      <view class="bg-emerald-400 h-20">
        <text>第三行内容，例如一些按钮或者其他组件。</text>
      </view>
    </view>
  </view>
</template>

<script>
import UText from "../../uni_modules/vk-uview-ui/components/u--text/u--text.vue";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";

export default {
  components: {UInput, UText},
  data() {
    return {
      show: true,
      a_score:0,
      a_win_round:0,
      b_score:0,
      b_win_round:0,
      total_round:0,
      done_round:0,
      user_index:0,
      use_time:0,
      timer_status:0,

      value: '',
      type: 'text',
      border: true
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>

</style>