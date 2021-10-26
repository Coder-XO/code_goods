<template>
  <div class="me">
    <div class="top">

    </div>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "Me",
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
.me {
  .top {
    background-color: #333333;
    width: 100%;
    height: 1.12rem;
  }
}
</style>
