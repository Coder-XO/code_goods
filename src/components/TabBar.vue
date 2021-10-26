<template>
  <div>
    <!--  底部导航-->
    <van-tabbar v-model="$route.meta.active" :route="true">
      <van-tabbar-item icon="wap-home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/topic">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/type">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
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
  },

};
</script>

<style lang="less" scoped>

</style>
