<template>
  <div>
    <h1>购物车</h1>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "Cart",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  props: {},
  components: {},
  created() {
    // 加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 200
    });
  }
};
</script>

<style lang="less" scoped>

</style>
