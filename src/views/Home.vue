<template>
  <div class="home">
    我是首页!
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// vant 组件的使用
import Vue from 'vue'
import { Button } from 'vant';
Vue.use(Button)
import 'vant/lib/button/style';
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
