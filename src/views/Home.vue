<template>
  <div class="home">
    <!-- 搜索框位置 -->
    <van-search disabled v-model="value" placeholder="请输入搜索关键词" shape="round"
                @click="$router.push('/home/SearchPopup')"/>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="v in banner" :key="v.id">
        <img :src="v.image_url" alt="" width="100%">
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5">
      <van-grid-item v-for="(v,k) in iconList" :key="v.name" :icon="v.icon_url" :text="v.name"/>
    </van-grid>
    <!--    品牌-->
    <div class="brand">
      <h1>品牌制造商</h1>
      <div class="goods">
        <div class="item" v-for="v in brandList" :key="v.id">
          <img :src="v.pic_url" alt="">
          <h4>{{ v.name }}</h4>
          <p>￥ {{ v.floor_price|toFixed }} 元</p>
        </div>
      </div>
    </div>
    <!--    新品首发  -->
    <div class="brand">
      <h1>周一周四 . 新品首发</h1>
      <div class="goods newGood">
        <div class="item" v-for="v in newGoods" :key="v.id">
          <img :src="v.list_pic_url" alt="">
          <h4>{{ v.name }}</h4>
          <p>￥ {{ v.retail_price|toFixed }} 元</p>
        </div>
      </div>
    </div>
    <!--    人齐推荐  -->
    <div class="brand">
      <h1>人气推荐</h1>
      <div class="goods hotGood">
        <div class="item" v-for="v in hotList" :key="v.id">
          <img :src="v.list_pic_url" alt="">
          <div class="text">
            <h2>{{ v.name }}</h2>
            <h4>{{ v.goods_brief }}</h4>
            <p>￥ {{ v.retail_price|toFixed }} 元</p>
          </div>
        </div>
      </div>
    </div>
    <!--    专题精选 -->
    <div class="brand topList">
      <h1>专题精选</h1>
      <div class="big_box">
        <div class="item_box">
          <div class="items" v-for="(v,k) in topicList" :key="v.id">
            <img :src="v.item_pic_url" alt="">
            <h2>{{ v.title }}<span>￥{{ v.price_info|toFixed }}...</span></h2>
            <p>{{ v.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--    分类-->
    <sort-i-item
        v-for="(v,k) in sortList"
        :key="v.id"
        :name="v.name"
        :goodsList="v.goodsList">
    </sort-i-item>
    <!-- 搜索框 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
// 封装的请求接口
import {GetHomeList} from "@/request/api";
import SortIItem from "@/components/SortIItem";

export default {
  name: 'Home',
  data() {
    return {
      value: '',
      active: 0,
      banner: [],
      iconList: [],  // 分类图标
      brandList: [],    //  制造商数据
      newGoods: [],    // 新品
      hotList: [],     // 热门商品
      topicList: [],   // 专题精选
      sortList: []    // 分类数据
    }
  },
  created() {
    //   首页所有数据 banner 图数据
    GetHomeList().then(res => {
      console.log(res)
      let {banner} = res.data
      this.banner = banner
      this.brandList = res.data.brandList
      this.iconList = res.data.channel
      this.newGoods = res.data.newGoodsList
      this.hotList = res.data.hotGoodsList
      this.topicList = res.data.topicList
      this.sortList = res.data.categoryList
    })
  },
  components: {SortIItem},
  filters: {
    toFixed(value) {
      return value.toFixed(2)
    }
  }
}
</script>
<style lang="less">
.home {
  padding-bottom: .5rem;
}

.slide-enter {
  right: -100%;
}

.slide-enter-to {
  right: 0;
}

.slide-enter-active {
  transition: all .3s linear;
}

.slide-leave {
  right: 0;
}

.slide-leave-to {
  right: -100%;
}

.slide-leave-active {
  transition: all .3s linear;
}

.brand {
  width: 100%;
  background-color: #fff;
  margin-top: .2rem;

  .goods {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      width: 1.84rem;
      height: 1.2rem;
      //background-color: green;
      margin-bottom: .04rem;
      position: relative;

      h4 {
        font-size: .14rem;
        color: #333;
        position: absolute;
        left: .1rem;
        top: .1rem;
      }

      p {
        color: #8B0000;
        font-size: .14rem;
        position: absolute;
        top: .4rem;
        left: .1rem;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  //新品
  .newGood {
    display: flex;
    justify-content: space-between;
    padding: 0 .1rem;
    flex-wrap: wrap;

    .item {
      position: relative;
      width: 1.74rem;
      height: 2.17rem;
      background-color: #fff;

      h4 {
        width: 100%;
        position: absolute;
        top: 1.6rem;
        left: 0;
        text-align: center;
      }

      p {
        width: 100%;
        position: absolute;
        top: 1.8rem;
        left: 0;
        text-align: center;
      }

      img {
        width: 1.74rem;
        height: 1.74rem;
      }
    }
  }

  //人气
  .hotGood {
    .item {
      width: 100%;
      height: 1.05rem;
      display: flex;
      justify-content: space-between;
      background-color: #FAFAFA;

      .text {
        width: 2.82rem;

        p {
          position: static;
          margin-top: .1rem;
          font-size: .12rem;
        }
      }

      h2 {
        font-size: .18rem;
        margin: .2rem 0;
      }

      h4 {
        position: static;
        margin: .1rem 0;
        font-size: .12rem;
      }

      p {
        position: static;
        margin-top: .1rem;
      }

      img {
        display: block;
        position: static;
        width: .88rem;
        height: .88rem;
        margin-top: .08rem;
      }
    }
  }


  h1 {
    height: .54rem;
    font-size: .2rem;
    text-align: center;
    line-height: .54rem;
  }

}

// 专题
.topList {
  display: block;
  //background-color: #8B0000;
  width: 100%;

  .big_box {
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
    padding: 0 .1rem;

    .item_box {
      width: 9.3rem;

      .items {
        float: left;
        width: 3rem;
        height: 2.66rem;
        //background-color: lawngreen;
        margin-right: .1rem;

        img {
          width: 3rem;
          height: 2rem;
        }

        h2 {
          span {
            color: #8B0000;
            font-size: .16rem;
            margin-left: .1rem;
          }

          margin: .06rem 0;
        }

        p {
          font-size: .14rem;
          margin-top: .1rem;
        }
      }
    }
  }
}
</style>
