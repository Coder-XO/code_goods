<template>
  <div>
    <van-search disabled shape="round" placeholder="请输入搜索关键词" @click="$router.push('/type/SearchPopup')"/>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item :title="v.name" v-for="(v,k) in categoryList" :key="v.id"/>
    </van-sidebar>
    <div class="flo">
      <img :src="currentImg" alt="">
      <p class="middleText">{{ currentImgText }}</p>
      <!--      小标题-->
      <div class="name">
        <span class="left"></span>
        <span class="right"></span>
        {{ currentTitle }}
      </div>
      <!--      九宫格-->
      <van-grid :column-num="3">
        <van-grid-item v-for="(v,k) in currentGoods" :key="v.id" :icon="v.wap_banner_url" :text="v.name"/>
      </van-grid>
    </div>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {GetTypeList} from "@/request/api";
import {Toast} from 'vant';
import {GetCurrentTypeList} from "@/request/api";

export default {
  name: "Type",
  data() {
    return {
      activeKey: 0,
      categoryList: [],
      idList: [],   // 存具体某一类的id
      currentTypeList: [],
      // 当前分类的数据
      currentImg: '',
      currentImgText: '',
      currentTitle: '',
      currentGoods: []
    };
  },
  methods: {},
  computed: {},
  watch: {
    "activeKey": {
      handler(value) {
        let self = this.idList
        let index = this.activeKey
        // 具体分类的请求
        GetCurrentTypeList({id: self[index]}).then(res => {
              this.currentImg = res.data.currentCategory.banner_url
              this.currentImgText = res.data.currentCategory.front_desc
              this.currentTitle = res.data.currentCategory.name
              this.currentGoods = res.data.currentCategory.subCategoryList
            },
            err => {
              console.log(err)
            })
      }
    }
  },
  props: {},
  components: {},
  created() {
    // 加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 200
    });
//请求所有分类
    GetTypeList().then(res => {
          console.log(res)
          this.categoryList = res.data.categoryList
          let self = this.idList
          let index = this.activeKey
          this.categoryList.forEach((item) => {
                self.push(item.id)
              }
          )
          // 具体分类的请求
          GetCurrentTypeList({id: self[index]}).then(res => {
                console.log(res)
                this.currentImg = res.data.currentCategory.banner_url
                this.currentImgText = res.data.currentCategory.front_desc
                this.currentTitle = res.data.currentCategory.name
                this.currentGoods = res.data.currentCategory.subCategoryList
              },
              err => {
                console.log(err)
              })
        },
        err => {
          console.log(err)
        })
    // 请求当前的分类数据

  }
};
</script>

<style lang="less">
div.van-sidebar {
  height: 5.6rem;

  a.van-sidebar-item {
    height: .622rem;
  }
}

.flo {
  position: absolute;
  top: .54rem;
  left: .8rem;
  width: 2.946rem;
  height: 5.42rem;
  //background-color: lawngreen;

  img {
    width: 2.85rem;
    height: 1.40rem;
    margin: 0 5px;
    border-radius: .1rem;
    box-shadow: 0 0 6px #000;
    filter: brightness(0.5);
  }

  img.van-icon__image {
    width: .28rem;
    height: .28rem;
    box-shadow: none;
  }

  .middleText {
    position: absolute;
    top: .7rem;
    left: 1rem;
    font-size: .14rem;
    color: #fff;
  }

  .name {
    width: 2.95rem;
    height: .5rem;
    background-color: #fff;
    text-align: center;
    line-height: .5rem;
    position: relative;

    span {
      height: .02rem;
      width: .3rem;
      display: block;
      background-color: #CCCCCC;
      position: absolute;
    }

    span.left {
      top: .23rem;
      left: .74rem;
    }

    span.right {
      top: .23rem;
      right: .74rem;
    }
  }
}
</style>
