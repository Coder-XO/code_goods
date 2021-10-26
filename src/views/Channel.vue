<template>
  <div>
    <van-tabs v-model="active" @click="onClick">
      <van-tab v-for="(v,k) in categoryList" :key="v.id" :title="v.name"></van-tab>
    </van-tabs>
    <sort-i-item name="0" :goods-list="goodsList"></sort-i-item>
  </div>
</template>

<script>
import {GetCurrentTypeList, GetTypeList} from "@/request/api";
import {GetGoodsList} from "@/request/api";
import SortIItem from "@/components/SortIItem";

export default {
  name: "Channel",
  data() {
    return {
      active: 0,
      idList: [],
      categoryList: [],
      goodsList: []
    };
  },
  methods: {
    // 点击切换  上部的导航
    onClick(value) {
      console.log(value)
      // 请求第一个分类的数据
      GetGoodsList({categoryId: this.idList[value], page: 1, size: 1000}).then(res => {
            this.goodsList = res.data.data
          },
          err => {
            console.log(err)
          })
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  },
  computed: {},
  watch: {},
  props: {},
  components: {SortIItem},
  created() {
    let routeId = this.$route.query.id
    let CurrentIndex = 0
    // 请求当前的分类数据
    GetTypeList().then(res => {
          this.categoryList = res.data.categoryList
          let self = this.idList
          let index = this.active
          this.categoryList.forEach((item) => {
                self.push(item.id)
              }
          )
          self.forEach((item, index) => {
            if (routeId == item) {
              this.active = index
            }
          })
          // 请求第一个分类的数据
          GetGoodsList({categoryId: self[this.active], page: 1, size: 1000}).then(res => {
                this.goodsList = res.data.data
              },
              err => {
                console.log(err)
              })
        },
        err => {
          console.log(err)
        })
  }
};
</script>

<style lang="less" scoped>
div.van-tabs {
  position: fixed;
  top: 0;
}
</style>
