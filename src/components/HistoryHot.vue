<template>
  <div class="history-hot">
    <div class="his-hot">
      <div class="hd">
        <h4>历史记录</h4>
        <van-icon name="delete-o"/>
      </div>
      <div class="tag">
        <van-tag plain type="default" v-for="(v,k) in historyKeywordList" :key="k">{{ v }}</van-tag>
      </div>
    </div>
    <div class="his-hot">
      <h4>热门搜索</h4>
      <div class="tag">
        <van-tag :color="v.is_hot===1?'red':''" plain type="default" v-for="(v,k) in hotKeywordList" :key="k">{{ v.keyword }}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryHot",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  props: {     // 父组件传来的数据
    "historyKeywordList": {
      type: Array,
      default: []
    },
    "hotKeywordList": {
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
.his-hot {
  width: 100%;
  background-color: #fff;
  margin-bottom: .2rem;
  box-sizing: border-box;
  padding: 2%;

  .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2%;
  }

  .van-tag {
    margin-right: .1rem;
    margin-top: .1rem;
    padding: .03rem;
  }

  .tag {
    margin-bottom: .15rem;
  }
}
</style>
