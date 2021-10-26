<template>
  <div class="topicBox">
    <van-grid :column-num="1" v-for="(v,k) in topicList" :key="v.id">
      <van-image :src="v.scene_pic_url"/>
      <van-grid-item class="firstText" :text="v.title"/>
      <van-grid-item class="secondText" :text="v.subtitle"/>
      <van-grid-item class="thirdText" :text="`￥ ${toFixed(v.price_info)} 元起`"/>
    </van-grid>
    <van-pagination v-model="currentPage" :show-page-size="0" :page-count="2" @change="changePage"/>
  </div>
</template>

<script>
import {Toast} from "vant";
import {GetTopicList} from "@/request/api";
import {GetCurrentTypeList} from "@/request/api";

export default {
  name: "Topic",
  data() {
    return {
      topicList: [],
      currentPage: 0
    };
  },
  methods: {
    toFixed(value) {
      return value.toFixed(2)
    },
    changePage(value) {
      GetTopicList({page: value, size: 10}).then(res => {
            console.log(res)
            this.topicList = res.data.data
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
  components: {},
  filters: {
    toFixed(value) {
      return value.toFixed(2)
    }
  },
  created() {
    // 加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 200
    });
    GetTopicList({page: 1, size: 10}).then(res => {
          this.topicList = res.data.data
        },
        err => {
          console.log(err)
        })
  }
};
</script>

<style lang="less">
.topicBox {
  width: 100%;

  .van-grid-item__content {
    padding: .08rem .08rem;
  }

  padding-bottom: .5rem;

  .secondText .van-grid-item__text {
    font-size: .16rem;
    color: #333;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: center;
  }

  .thirdText .van-grid-item__text {
    font-size: .14rem;
    color: #9B0000;
  }
}

.firstText .van-grid-item__text {
  font-size: .18rem;
  color: #333;
}
</style>
