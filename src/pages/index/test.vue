<template>
  <view class="content">
    <!-- 给图片添加点击事件，绑定到 handleImageClick 方法 -->
    <image class="logo" src="/static/logo.png" @click="handleImageClick"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script>
import {
  UDPClient
} from '@/uni_modules/uts-udp';
export default {
  data() {
    return {
      title: 'Hello',
      msg: { value: '' } // 初始化 msg 变量
    };
  },

  onShow() {
    const platform = uni.getSystemInfoSync().platform
    console.log('当前平台222222:', platform);
    // 判断是否在 App 环境中
    if (platform === 'android') {
      console.log("111111")
      plus.key.addEventListener('keydown', function(e) {
        console.log("2222", e.keyCode) // 查看获取的信息，每个按键都会有不同的key值
        if (e.keyCode === 124) {

        }
      })
    }
  },


  onLoad() {
    this.startReceiving();
    const platform = uni.getSystemInfoSync().platform
    console.log('当前平台:', platform);
    // 判断是否在 App 环境中
    if (platform === 'android') {
      console.log("进入 App 环境，准备监听按键");
      // 监听 plusready 事件，确保 plus 环境准备好
      // 修改为使用 plus.globalEvent.addEventListener
      plus.globalEvent.addEventListener('plusready', () => {
        // 监听返回键
        plus.key.addEventListener('backbutton', (e) => this.handleKeyPress('返回键', e), false);
        // 监听菜单键
        plus.key.addEventListener('menubutton', (e) => this.handleKeyPress('菜单键', e), false);
        // 监听 Home 键
        plus.key.addEventListener('homebutton', (e) => this.handleKeyPress('Home 键', e), false);
        // 可以根据实际设备情况添加更多按键监听，例如音量键等

        // 监听所有按键
        document.addEventListener('keydown', (e) => {
          console.log('keydown event triggered', e);
          const keyCode = e.keyCode;
          const keyName = this.getKeyName(keyCode);
          this.handleKeyPress(keyName, e);
        }, false);
      }, false);
    } else {
      console.log("非 App 环境，不支持 plus.key 监听");
    }
  },
  onUnload() {
    // 在页面卸载时移除事件监听器，避免内存泄漏
    if (uni.getSystemInfoSync().platform === 'android') {
      plus.key.removeEventListener('backbutton', (e) => this.handleKeyPress('返回键', e));
      plus.key.removeEventListener('menubutton', (e) => this.handleKeyPress('菜单键', e));
      plus.key.removeEventListener('homebutton', (e) => this.handleKeyPress('Home 键', e));
      // 移除对应添加的其他按键监听

      // 移除 keydown 事件监听
      document.removeEventListener('keydown', (e) => {
        const keyCode = e.keyCode;
        const keyName = this.getKeyName(keyCode);
        this.handleKeyPress(keyName, e);
      });
    }
  },
  methods: {
    handleKeyPress(keyName, event) {
      console.log(`按下了 ${keyName}，事件信息：`, event);
      // 这里可以添加更多针对按键按下后的自定义逻辑
    },
    getKeyName(keyCode) {
      // 根据 keyCode 获取对应的键名
      switch (keyCode) {
        case 8:
          return 'Backspace';
        case 13:
          return 'Enter';
        case 27:
          return 'Escape';
        case 32:
          return 'Space';
          // 可以根据需要添加更多键码映射
        default:
          return `KeyCode: ${keyCode}`;
      }
    },
    // 处理图片点击事件的方法
    handleImageClick() {
      console.log('图片被点击了');
      // 这里可以添加更多图片点击后的自定义逻辑
    },

    startReceiving() {
      UDPClient.send({
        host: "255.255.255.255",
        port: 5000,
        receiveTimeout: 5000,
        msg: this.msg.value, // 使用初始化后的 msg 变量
        enableRecive: true,
        onceReceive: (data) => {
          console.log("666",data)
        },
        onError: (error) => {
          console.error("4444",error);
        },
        onceReceiveTimeout: () => {
          console.warn("服务器超时未回复");
        }
      });
    }
  }
};
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
