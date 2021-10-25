<template>
  <div>
    <!--  底部导航-->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o" to="/" @click="active=$route.meta.active">主页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/topic" @click="active=$route.meta.active">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/type" @click="active=$route.meta.active">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart" @click="active=$route.meta.active">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me" @click="active=$route.meta.active">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  computed: {},
  watch: {},
  props: {},
  components: {},
  created() {
    this.active = this.$route.meta.active
  }
};
</script>

<style lang="less" scoped>

</style>
