<template>
  <div>
    <van-icon name="warning-o" size="160" color="#DEE0E2"/>
    <h3>暂无搜索结果</h3>
  </div>
</template>

<script>
export default {
  name: "GoodsSearchNone",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  props: {},
  components: {},
  created() {
  }
};
</script>

<style lang="less" scoped>
.van-icon {
  //margin: .2rem auto;
  margin-left: 1.1rem;
  margin-top: 1rem;
  display: block;
}
h3{
  font-size: .14rem;
  color: #969799;
  text-align: center;
  margin-top: .5rem;
}
</style>
