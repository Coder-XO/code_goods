<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="item in searchList" :key="item" @click="searchGood(item)" :title="item"/>
    </van-list>
  </div>
</template>

<script>

export default {
  name: "SearchList",
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7],
      loading: true,
      finished: true,
    };
  },
  methods: {
    onLoad() {
      // console.log(111)
    },
    searchGood(value) {   // 传递给父组件关键词
      this.$emit("changeKeyword", value)
    }
  },
  computed: {},
  watch: {},
  props: {
    "searchList": {
      type: Array,
      default: []
    }
  },
  components: {},
  created() {
  }
};
</script>

<style lang="less" scoped>

</style>
