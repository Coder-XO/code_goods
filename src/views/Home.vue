<template>
  <div class="home">
    我是首页!
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-rate v-model="value"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: 3,
    }
  },
  components: {}
}
</script>
