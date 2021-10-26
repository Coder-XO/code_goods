<template>
  <div class="popup">
    <form action="/">
      <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @input="onInput"
      />
    </form>
    <history-hot
        v-if="blockShow===1"
        :historyKeywordList="historyKeywordList"
        :hotKeywordList="hotKeywordList"
        @changeTags="changeTags"
        @clickHistory="clickHistory">
    </history-hot>
    <search-list v-if="blockShow===2" :searchList="searchList" @changeKeyword="changeKeyword"></search-list>
    <goods-search-page v-if="blockShow===3" :searchGoods="searchGoods" :typeList="typeList" @priceSort="priceSort"
                       @typeChange="typeChange"
    ></goods-search-page>
    <goods-search-none v-if="blockShow===4"></goods-search-none>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot";
import {GetPopupData} from "@/request/api";
import SearchList from "@/components/SearchList";
import {GetSearchList} from "@/request/api";
import {Toast} from "vant";
import GoodsSearchPage from "@/components/GoodsSearchPage";
import {GetGoodsList} from "@/request/api";
import GoodsSearchNone from "@/components/GoodsSearchNone";

export default {
  name: "SearchPopup",
  data() {
    return {
      value: '',
      hotKeywordList: [],
      historyKeywordList: [],
      blockShow: 1,
      searchList: [],
      // 搜索结果传值
      searchGoods: [],
      typeList: [],
      // 商品列表的解决
      dataSelect: "无"
    };
  },
  methods: {
    // 搜索框值变化
    onInput() {
      this.blockShow = 2
      // 请求搜索列表
      GetSearchList({keyword: this.value}).then(res => {
            this.searchList = res.data
          },
          err => {
            console.log(err)
          })
    },
    // 搜索函数
    onSearch(val) {
      GetGoodsList({keyword: this.value, size: 30}).then(res => {
            console.log(res)
            if (res.data.count === 0) {   // 展示无结果页面
              this.blockShow = 4
            } else {    // 有结果
              this.searchGoods = res.data.data
              this.typeList = res.data.filterCategory
              this.blockShow = 3
            }
          },
          err => {
            console.log(err)
          })
    },
    onCancel() {
      this.$emit('changeHomeShow', true)
      this.$router.go(-1)   // 返回上一级
    },
    changeKeyword(value) {    // 列表的点击事件触发的父组件修改事件
      this.value = value
      GetGoodsList({keyword: value, size: 30}).then(res => {
            console.log(res)
            if (res.data.count === 0) {   // 展示无结果页面
              this.blockShow = 4
            } else {    // 有结果
              this.searchGoods = res.data.data
              this.typeList = res.data.filterCategory
              this.blockShow = 3
            }
          },
          err => {
            console.log(err)
          })
    },
    // 清除列表后的事件
    changeTags() {
      // 历史与热门搜索
      GetPopupData().then(res => {
            this.hotKeywordList = res.data.hotKeywordList
            this.historyKeywordList = res.data.historyKeywordList
          },
          err => {
            console.log(err)
          })
    },
    // 点击历史  热门 标签搜索
    clickHistory(v) {
      this.value = v
      GetGoodsList({keyword: this.value, size: 30}).then(res => {
            console.log(res)
            if (res.data.count === 0) {   // 展示无结果页面
              this.blockShow = 4
            } else {    // 有结果
              this.searchGoods = res.data.data
              this.typeList = res.data.filterCategory
              this.blockShow = 3
            }
          },
          err => {
            console.log(err)
          })
      this.blockShow = 3
    },
    // 价格排序商品
    priceSort(v) {
      if (v === 0) {   // 从高到底排序
        // 加载提示
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 200
        });
        GetGoodsList({keyword: this.value, size: 30, order: 'desc', sort: 'price'}).then(res => {
              if (res.data.count === 0) {   // 展示无结果页面
                this.blockShow = 4
              } else {    // 有结果
                this.searchGoods = res.data.data
                this.typeList = res.data.filterCategory
                this.blockShow = 3
              }
            },
            err => {
              console.log(err)
            })
      } else {    // 从低到高
        // 加载提示
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 200
        });
        GetGoodsList({keyword: this.value, size: 30, order: 'asc', sort: 'price'}).then(res => {
              if (res.data.count === 0) {   // 展示无结果页面
                this.blockShow = 4
              } else {    // 有结果
                this.searchGoods = res.data.data
                this.typeList = res.data.filterCategory
                this.blockShow = 3
              }
            },
            err => {
              console.log(err)
            })
      }
    },
    //  居家排序
    typeChange(v) {
      // 加载提示
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 200
      });
    }
  },
  computed: {},
  props: {},
  components: {GoodsSearchNone, GoodsSearchPage, SearchList, HistoryHot},
  created() {
    // 历史与热门搜索
    GetPopupData().then(res => {
          this.hotKeywordList = res.data.hotKeywordList
          this.historyKeywordList = res.data.historyKeywordList
        },
        err => {
          console.log(err)
        })
    // 主页隐藏
    this.$emit('changeHomeShow', false)
  },
  mounted() {
    setTimeout(() => {
      // 加载提示
      console.log('出来了了')
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 200
      });
    }, 300)
  }
};
</script>

<style lang="less" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  background-color: #EFEFEF;
}
</style>
