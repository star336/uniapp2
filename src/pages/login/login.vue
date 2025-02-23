<template>
  <view class="page-container  h-screen overflow-y-auto">
    <view class="scroll-container">
      <view class="h-20 bg-amber-100" v-if="show" @click="toggleShow">

      </view>

      <view class="bg-yellow-950 h-screen scroll-container flex justify-center items-center">
        <view class="bg-green-100 h-3/5 w-4/5 flex gap-x-0">
          <view class="bg-blue-200 h-full w-1/5 grid grid-cols-1 md:grid-cols-2">
            <text>A</text>
            <text>a_score:{{ aScore }}</text>
            <text>a_win_round:{{ a_win_round }}</text>
            <text>a_max:{{ aMax }}</text>
            <text>a_fault:{{ a_fault }}</text>
            <text>total_round:{{ total_round }}</text>
            <text>done_round:{{ done_round }}</text>
            <text>user_index:{{ user_index }}</text>
            <text>use_time:{{ doubleUseTime }}</text>
            <text>timer_status:{{ doubleUseTimerStatus }}</text>
          </view>
          <view class="bg-yellow-100 h-full w-1/5 ml-[calc(1/15*100%)] grid grid-cols-1 md:grid-cols-2">
            <text>B</text>
            <text>b_score:{{ bScore }}</text>
            <text>b_win_round:{{ b_win_round }}</text>
            <text>b_max:{{ bMax }}</text>
            <text>b_fault:{{ b_fault }}</text>
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
            <u-button type="primary" @click="updateScore(userIndex, 1)">1</u-button>
            <u-button type="primary">2</u-button>
            <u-button type="primary">设置数量</u-button>
            <u-button type="primary" @click="updateUseTime">{{ time_words }}</u-button>
            <u-button type="primary">next</u-button>
            <u-button type="primary" @click="switchUserIndex">switch</u-button>
            <u-button type="primary">finish</u-button>
            <u-button type="primary">zero</u-button>
            <u-button type="primary">fault</u-button>
            <u-button type="primary">max</u-button>
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
import {useAuthStore} from '../../utils/authStore.js';

export default {
  components: {UInput, UText},
  computed: {
    updateTimeWords() {
      return this.time_words = this.doubleUseTimerStatus ? "开始计时" : "暂停计时";
    },
    aScore() {
      return this.authStore.doubleMode.a_score;
    },
    bScore() {
      return this.authStore.doubleMode.b_score;
    },
    aMax() {
      return this.authStore.doubleMode.a_max;
    },
    bMax() {
      return this.authStore.doubleMode.b_max;
    },
    userIndex() {
      return this.authStore.doubleMode.user_index;
    },
    doubleUseTime() {
      return this.authStore.doubleMode.double_use_time;
    },
    doubleUseTimerStatus() {
      return this.authStore.doubleMode.double_timer_status;
    }
  },
  data() {
    return {
      show: true,
      a_win_round: 0,
      a_fault: 0,
      a_max: 0,
      b_score: 0,
      b_win_round: 0,
      b_fault: 0,
      b_max: 0,
      total_round: 0,
      done_round: 0,
      double_use_time: 0,
      double_timer_status: 0,
      time_words: "开始计时",

      value: '',
      type: 'text',
      border: true
    };
  },

  created() {
    // 在组件创建时初始化 authStore
    this.authStore = useAuthStore();
    // 检查存储的时间，并重新启动定时器
    if (this.authStore.doubleMode.double_timer_status > 0) {
      this.startTimer();
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    updateScore(index, value) {
      // 可以直接使用组件顶层定义的 authStore
      let user, userMax;

      user = index === 0 ? 'a_score' : 'b_score';
      userMax = index === 0 ? 'a_max' : 'b_max';

      this.authStore.doubleMode[user] += value;
      console.log(user, userMax);
      // 连续逻辑 如果用户不变则追加 且对方归零
      if (userMax === 'a_max') {
        this.authStore.doubleMode["a_max"] += value;
        if (this.authStore.doubleMode["b_max"]) {
          this.authStore.doubleMode["b_max"] = 0;
        }
      } else {
        this.authStore.doubleMode["b_max"] += value;
        if (this.authStore.doubleMode["a_max"]) {
          this.authStore.doubleMode["a_max"] = 0;
        }
      }
    },
    switchUserIndex() {
      this.authStore.doubleMode["user_index"] = (!this.authStore.doubleMode["user_index"]) * 1;
      console.log(this.authStore.doubleMode["user_index"]);
    },

    // 定时器相关方法
    updateUseTime() {
      // 如果存在则关闭
      if (this.authStore.doubleTimer) {
        console.log(111);
        this.stopTimer();
      } else {
        console.log(2222);
        this.startTimer();
        this.authStore.doubleMode["double_timer_status"] = 1;
      }
    },
    addUseTime() {
      // 每次调用 updateUseTime 时，将 user_time 加 1
      this.authStore.addPiniaUseTime();
    },
    startTimer() {
      // 开始定时器，每隔 1 秒调用一次 updateUseTime 方法
      this.authStore.doubleTimer = setInterval(this.addUseTime, 1000);
      this.time_words = "暂停计时";
    },
    stopTimer() {
      // 停止定时器
      if (this.authStore.doubleTimer) {
        clearInterval(this.authStore.doubleTimer);
        this.authStore.doubleTimer = null;
        this.authStore.doubleMode["double_timer_status"] = 0;
        this.time_words = "开始计时";
      }
    }


  }
};
</script>

<style scoped>

</style>