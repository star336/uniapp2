<template>
  <view class="page-container h-screen overflow-y-auto">
    <!-- 遮罩层 -->
    <view
        v-if="showNumberModal || showToastMask"
        class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 pointer-events-all z-50"
        @click="closeModalIfOutside($event)"
    ></view>
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
            <text>total_round:{{ totalRound }}</text>
            <text>done_round:{{ done_round }}</text>
            <text>user_index:{{ userIndex }}</text>
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
            <u-button type="primary">record</u-button>
            <u-button type="primary" @click="updateUseTime">{{ time_words }}</u-button>
            <u-button type="primary" @click="next">next</u-button>
            <CustomToast v-if="showToast" :message="toastMessage" :width="toastWidth" :height="toastHeight"/>
            <u-button type="primary" @click="switchUserIndex">switch</u-button>
            <u-button type="primary">finish</u-button>
            <u-button type="primary" @click="clearData">zero</u-button>
            <u-button type="primary">setting</u-button>
            <u-button type="primary">back</u-button>
            <u-button type="primary">mode</u-button>
            <!-- 新增弹出数字选择弹窗的按钮 -->
            <u-button type="primary" @click="showNumberModal = true">round</u-button>
          </view>
        </view>
      </view>
      <view class="bg-emerald-400 h-20">
        <text>第三行内容，例如一些按钮或者其他组件。</text>
      </view>
      <!-- 数字选择弹窗 -->
      <view
          v-if="showNumberModal"
          class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      >
        <view class="bg-white p-4 rounded-lg">
          <!-- 显示累加和 -->
          <view class="text-center mb-2">{{ sumDisplay }}</view>
          <!-- 数字选择区域 -->
          <view class="grid grid-cols-5 gap-2">
            <button
                v-for="num in 10"
                :key="num"
                @click="addNumber(num - 1)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {{ num - 1 }}
            </button>
          </view>
          <!-- 取消和保存按钮 -->
          <view class="flex justify-between mt-4">
            <button
                @click="showNumberModal = false; clearSelectedNumbers()"
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              取消
            </button>
            <button
                @click="saveData(); showNumberModal = false; clearSelectedNumbers()"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              保存
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UText from "../../uni_modules/vk-uview-ui/components/u--text/u--text.vue";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";
import {useAuthStore} from '../../utils/authStore.js';
import CustomToast from '../../component/CustomToast.vue';

export default {
  components: {UInput, UText, CustomToast},
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
    },
    totalRound() {
      console.log(this.authStore.doubleMode.total_round);
      return this.authStore.doubleMode.total_round;
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
      border: true,
      // 控制数字选择弹窗的显示与隐藏
      showNumberModal: false,
      // 存储用户选择的数字
      selectedNumbers: [],
      // 用于显示累加和，但不真实保存
      sumDisplay: 0,

      // 控制提示框遮罩层的显示与隐藏
      showToastMask: false,


      // 自定义弹窗
      showToast: false,
      toastMessage: '',
      toastWidth: 300,
      toastHeight: 150
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
    next() {
      if (!this.authStore.doubleMode.total_round) {
        this.showCustomToast("not setting total round")
      }
      if (this.authStore.doubleMode.a_score == this.authStore.doubleMode.b_score) {
        this.showCustomToast("error same score")
      }
      if (this.authStore.doubleMode.total_round - 1 <= 0) {
        this.showCustomToast("error the last round")
      }
      if (this.authStore.doubleMode.a_score > this.authStore.doubleMode.b_score) {
        this.authStore.doubleMode["a_win_round"] += 1;
      } else {
        this.authStore.doubleMode["b_win_round"] += 1;
      }

      this.authStore.setDoubleMode({
        a_score: 0,
        a_win_round: this.authStore.doubleMode.a_win_round,
        a_fault: 0,
        a_max: 0,
        a_max_tmp: 0,
        b_score: 0,
        b_win_round: this.authStore.doubleMode.b_win_round,
        b_fault: 0,
        b_max: 0,
        b_max_tmp: 0,
        total_round: this.authStore.doubleMode.total_round,
        done_round: this.authStore.doubleMode.done_round + 1,
        user_index: 0,
        double_use_time: this.authStore.doubleMode.double_use_time,
        double_timer_status: this.authStore.doubleMode.double_timer_status
      })
    },
    showCustomToast(toastMessage) {
      this.toastMessage = toastMessage;
      this.showToast = true;
      this.showToastMask = true;
      setTimeout(() => {
        this.showToast = false;
        this.showToastMask = false;
      }, 2000);
    },
    toggleShow() {
      this.show = !this.show;
    },
    // 清零
    clearData() {
      this.authStore.setDoubleMode({
        a_score: 0,
        a_win_round: 0,
        a_fault: 0,
        a_max: 0,
        a_max_tmp: 0,
        b_score: 0,
        b_win_round: 0,
        b_fault: 0,
        b_max: 0,
        b_max_tmp: 0,
        total_round: 0,
        done_round: 0,
        user_index: 0,
        double_use_time: 0,
        double_timer_status: 0
      })
    },
    updateScore(index, value) {
      // 可以直接使用组件顶层定义的 authStore
      let user, userMax, a_before_max, b_before_max;

      user = index === 0 ? 'a_score' : 'b_score';
      userMax = index === 0 ? 'a_max' : 'b_max';

      this.authStore.doubleMode[user] += value;
      console.log(user, userMax);
      // 连续逻辑 如果用户不变则追加 且对方归零
      if (index === 0) {
        a_before_max = this.authStore.doubleMode["a_max"];
        this.authStore.doubleMode["a_max_tmp"] += value;
        if (this.authStore.doubleMode["a_max_tmp"] > this.authStore.doubleMode["a_max"]) {
          this.authStore.doubleMode["a_max"] = this.authStore.doubleMode["a_max_tmp"];
        }
      } else {
        b_before_max = this.authStore.doubleMode["b_max"];
        this.authStore.doubleMode["b_max_tmp"] += value;
        if (this.authStore.doubleMode["b_max_tmp"] > this.authStore.doubleMode["b_max"]) {
          this.authStore.doubleMode["b_max"] = this.authStore.doubleMode["b_max_tmp"];
        }
      }
    },
    switchUserIndex() {
      // 把用户临时最高分归零
      if (this.authStore.doubleMode["user_index"]) {
        this.authStore.doubleMode["b_max_tmp"] = 0
      } else {
        this.authStore.doubleMode["a_max_tmp"] = 0
      }

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
    },
    // 处理数字选择
    addNumber(num) {
      this.selectedNumbers.push(num);
      console.log(this.selectedNumbers, num);
      // 更新 sumDisplay
      this.sumDisplay += num;
    },
    // 保存数据
    saveData() {
      console.log(this.authStore.doubleMode["total_round"]);
      this.authStore.setDoubleMode({
        a_score: 0,
        a_win_round: 0,
        a_fault: 0,
        a_max: 0,
        a_max_tmp: 0,
        b_score: 0,
        b_win_round: 0,
        b_fault: 0,
        b_max: 0,
        b_max_tmp: 0,
        total_round: this.sumDisplay,
        done_round: 0,
        user_index: 0,
        double_use_time: 0,
        double_timer_status: 0
      })
    },
    // 清空已选择的数字
    clearSelectedNumbers() {
      this.selectedNumbers = [];
      // 重置 sumDisplay
      this.sumDisplay = 0;
    },
    // 点击遮罩层关闭弹窗
    closeModalIfOutside(event) {
      if (event.target.classList.contains('bg-gray-500')) {
        this.showNumberModal = false;
        this.clearSelectedNumbers();
      }
    }
  }
};
</script>

<style scoped>

</style>