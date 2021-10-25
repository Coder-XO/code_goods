<template>
  <div class="popup">
    <form action="/">
      <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <history-hot
        v-if="blockShow===1"
        :historyKeywordList="historyKeywordList"
        :hotKeywordList="hotKeywordList">
    </history-hot>
    <search-list v-if="blockShow===2" :searchList="searchList"></search-list>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot";
import {GetPopupData} from "@/request/api";
import SearchList from "@/components/SearchList";
import {GetSearchList} from "@/request/api";


export default {
  name: "SearchPopup",
  data() {
    return {
      value: '',
      hotKeywordList: [],
      historyKeywordList: [],
      blockShow: 1,
      searchList: []
    };
  },
  methods: {
    onSearch(val) {

    },
    onCancel() {
      this.$router.go(-1)   // 返回上一级
    },
  },
  computed: {},
  watch: {
    "value": {    // 搜索内容变化了就发请求
      handler(newValue, oldValue) {
        console.log(newValue)
        this.blockShow = 2
        // 请求搜索列表
        GetSearchList({keyword: newValue}).then(res => {
              this.searchList = res.data
            },
            err => {
              console.log(err)
            })
      }
    }
  },
  props: {},
  components: {SearchList, HistoryHot},
  created() {
    // 历史与热门搜索
    GetPopupData().then(res => {
          this.hotKeywordList = res.data.hotKeywordList
          this.historyKeywordList = res.data.historyKeywordList
        },
        err => {
          console.log(err)
        })
  }
};
</script>

<style lang="less" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  background-color: #aaa;
}
</style>
