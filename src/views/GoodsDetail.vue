<template>
  <div class="goodsDetail">
    <div class="innerBox" ref="innerBox">
      <!--      轮播-->
      <van-swipe :autoplay="3000" indicator-color="#9B0000">
        <van-swipe-item v-for="(v, k) in bannerList" :key="v.id">
          <van-image
              width="375"
              :src="v.img_url"
          />
        </van-swipe-item>
      </van-swipe>
      <!--      退货等-->
      <div class="tips">
        <div class="item">
          <van-icon name="wechat-pay" color="#9B0000"/>
          <span>30天无忧退货</span>
        </div>
        <div class="item">
          <van-icon name="wechat-pay" color="#9B0000"/>
          <span>48小时快速退费</span>
        </div>
        <div class="item">
          <van-icon name="wechat-pay" color="#9B0000"/>
          <span>满80元包邮费</span>
        </div>
      </div>
      <!--      商品描述-->
      <div class="desc">
        <h2 class="first">{{ goodName }}</h2>
        <h3>{{ goodBrief }}</h3>
        <p>￥ {{ goodPrice|toFixed }} 元</p>
      </div>
      <!--      商品参数-->
      <div class="parameter">
        <h2>商品参数</h2>
        <ul class="parameterBox">
          <li class="parameterItem" v-for="(v,k) in attribute" :key="v.name">
            <span class="one">{{ v.name }}</span>
            <span class="two">{{ v.value }}</span>
          </li>
        </ul>
      </div>
      <!--        商品详情图片-->
      <div class="goodDetail" v-html="goodDetailDesc"></div>
      <!--      常见问题与相关产品-->
      <div class="issue">
        <h3>常见问题</h3>
        <div class="questionBox" v-for="(v,k) in issueList" :key="v.id">
          <h3 class="question">{{ v.question }}</h3>
          <p class="answer">{{ v.answer }}</p>
        </div>
      </div>
      <!--      相关产品-->
      <sort-i-item :name="`相关产品`" :goods-list="relatedGoods"></sort-i-item>
      <!--    返回选项-->
      <van-nav-bar
          left-text="返回首页"
          left-arrow
          @click-left="onClickLeft"
      />
      <!--      弹出遮罩层-->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <div class="top">
              <img :src="list_pic_url" alt="">
              <div class="right">
                <p>价格: ￥ {{ goodPrice|toFixed }} 元</p>
                <p>库存: {{ storage }}</p>
              </div>
            </div>
            <h2>数量 :</h2>
            <van-stepper v-model="value" min="1" :max="storage"/>
          </div>
        </div>
      </van-overlay>
    </div>
    <!--    底部购物车-->
    <van-goods-action>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" @click="toCart"/>
      <van-goods-action-button type="danger" text="立即购买"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
    </van-goods-action>
  </div>
</template>

<script>
import {GetCurrentGood} from "@/request/api";
import {GetRelatedGoods} from "@/request/api";
import SortIItem from "@/components/SortIItem";
import {Toast} from 'vant';
import axios from "axios";

export default {
  name: "GoodsDetail",
  data() {
    return {
      // 轮播图
      bannerList: [],
      goodName: '',
      goodBrief: '',
      goodPrice: '',
      goodDetailDesc: '',
      attribute: [],
      issueList: [],
      relatedGoods: [],
      show: false,
      // 遮罩层数据
      list_pic_url: '',
      storage: 0,
      // 遮罩层购物车数量
      value: 1,
      badge: 0,
      // 产品 id
      productId: 0
    };
  },
  methods: {
    // 添加购物车
    addCart() {
      if (this.show) {   // 真正加入购物车
        if (!localStorage.getItem('token')) {
          this.$router.push({
            path: '/cart'
          })
        } else {   // 可以调用加入购物车逻辑了
          // 添加购物车
          axios.post('http://kumanxuan1.f3322.net:8001/cart/add', {
            goodsId: this.$route.query.id,
            productId: this.productId,
            number: this.value
          }, {
            headers: {
              'X-Nideshop-Token': localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res)
            if (res.data.errno === 0) {    // 添加成功!
              Toast.success('添加成功!')
              this.show = false
              // 请求购物车数量
              axios.post('http://kumanxuan1.f3322.net:8001/cart/goodscount', {}, {
                headers: {
                  'X-Nideshop-Token': localStorage.getItem('token')
                }
              }).then(res => {
                this.badge = res.data.data.cartTotal.goodsCount
              })
            } else if (res.data.errno === 400) {
              Toast.success('库存不足!')
              this.show = false
            } else {
              Toast.fail(res.data.errmsg)
              this.show = false
            }
          })
        }
      }
      this.show = true
    },
    // 去购物车
    toCart() {
      this.$router.push({
        path: '/cart'
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/'
      })
    }
  },
  computed: {},
  watch: {
    $route: {
      handler(url) {    // 监听路由参数变化了
        let id = url.query.id
        GetCurrentGood({id: id}).then(res => {
              console.log(res)
              this.bannerList = res.data.gallery
              this.goodName = res.data.info.name
              this.goodBrief = res.data.info.goods_brief
              this.goodPrice = res.data.info.retail_price
              this.goodDetailDesc = res.data.info.goods_desc
              this.attribute = res.data.attribute
              this.goodDetailDesc = res.data.info.goods_desc
              this.issueList = res.data.issue
              // 遮罩层的数据
              this.list_pic_url = res.data.info.list_pic_url
              this.storage = res.data.info.goods_number
              // 产品 id
              this.productId = res.data.productList[0].id
              console.log(this.productId)
              GetRelatedGoods({id: id}).then(res => {
                    this.relatedGoods = res.data.goodsList
                  },
                  err => {
                    console.log(err)
                  })
            },
            err => {
              console.log(err)
            })
        setTimeout(() => {
          // 加载提示
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 200
          });
          this.$refs.innerBox.scrollTop = 0
        }, 100)
      }
    }
  },
  props: {},
  components: {SortIItem},
  filters: {
    toFixed(value) {
      return parseFloat(value).toFixed(2)
    }
  },
  created() {
    //请求商品详情数据
    let id = this.$route.query.id
    console.log(id)
    GetCurrentGood({id: id}).then(res => {
          console.log(res)
          this.bannerList = res.data.gallery
          this.goodName = res.data.info.name
          this.goodBrief = res.data.info.goods_brief
          this.goodPrice = res.data.info.retail_price
          this.goodDetailDesc = res.data.info.goods_desc
          this.attribute = res.data.attribute
          this.goodDetailDesc = res.data.info.goods_desc
          this.issueList = res.data.issue
          // 遮罩层的数据
          this.list_pic_url = res.data.info.list_pic_url
          this.storage = res.data.info.goods_number
          this.productId = res.data.productList[0].id
          console.log(this.productId)
          GetRelatedGoods({id: id}).then(res => {
                this.relatedGoods = res.data.goodsList
              },
              err => {
                console.log(err)
              })
        },
        err => {
          console.log(err)
        })
    // 请求购物车数量
    axios.post('http://kumanxuan1.f3322.net:8001/cart/goodscount', {}, {
      headers: {
        'X-Nideshop-Token': localStorage.getItem('token')
      }
    }).then(res => {
      this.badge = res.data.data.cartTotal.goodsCount
    })
  }
};
</script>

<style lang="less" scoped>
.goodsDetail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  //position: absolute;
  //z-index: 3;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.tips {
  height: .34rem;
  width: 100%;
  background-color: #EFEFEF;
  margin-top: -.04rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 .1rem;

  .item {
    span {
      font-size: .13rem;
    }
  }
}

div.desc {
  width: 100%;
  height: 1.61rem;
  padding: .2rem 0;
  background-color: white;
  border-bottom: 1px solid #CCCCCC;

  h2.first {
    font-size: .2rem;
    text-align: center;
    color: #333;
    height: .4rem;
    line-height: .4rem;
  }

  h3 {
    text-align: center;
    color: #333;
    font-size: .14rem;
    height: .4rem;
    line-height: .4rem;
  }

  p {
    text-align: center;
    color: #9B0000;
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
  }
}

//商品参数
div.parameter {
  margin-top: .24rem;
  background-color: white;
  padding: .1rem;
  box-sizing: border-box;

  h2 {
    font-size: .2rem;
    color: #333;
    line-height: .4rem;
    height: .4rem;
  }

  .parameterBox {
    .parameterItem {
      background: #efefef;
      border-radius: 6px;
      height: 30px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

      span.one {
        color: #999;
        width: 20%;
        margin-right: 5px;
        text-align: right;
        font-size: .14rem;
      }

      span.two {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: .14rem;
        color: #333;
      }
    }
  }
}

// 商品详情
.goodsDetail {
  width: 3.75rem;
}

div.innerBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #EFEFEF;
  padding-bottom: .5rem;
  padding-top: .5rem;

  /deep/ .goodDetail {
    p {
      width: 3.75rem;

      img {
        display: block !important;
        width: 3.75rem !important;
      }
    }
  }

  .issue {
    margin-top: .14rem;
    background-color: white;

    /deep/ h3 {
      width: 30%;
      height: .4rem;
      background: #fff;
      text-align: center;
      line-height: 40px;
      font-size: .18rem;
      margin: auto;
      color: #333;
    }

    h3.question {
      width: 80%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      position: relative;
      padding: 0 .1rem 0 .2rem;
      margin: 0;
      text-align: left;

      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        border-radius: 50%;
        position: absolute;
        left: 8px;
        top: 50%;
        margin-top: -2px;
      }
    }

    p.answer {
      padding-left: 20px;
      padding-right: 10px;
      color: #666;
      font-size: .14rem;
    }
  }
}

div.van-nav-bar {
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 0;

  /deep/ i.van-icon {
    color: #9B0000;
  }

  /deep/ span.van-nav-bar__text {
    color: #9B0000;
  }
}

//底部购物车
div.van-goods-action {
  position: fixed;
  bottom: 0;
  z-index: 5;
}

div.go {
  position: fixed;
  top: 1rem;
  left: 0;
  width: .55rem;
  line-height: .36rem;
  height: .36rem;
  background-color: #9B0000;

  span {
    font-size: .14rem;
  }
}


// 遮罩层数据
.wrapper {
  position: relative;
  height: 100%;
}

.block {
  box-sizing: border-box;
  padding: .1rem;
  position: absolute;
  width: 100%;
  height: 2.65rem;
  background-color: #fff;
  bottom: 0;

  .top {
    display: flex;
    justify-content: space-between;

    img {
      display: block;
      width: 1rem;
      height: 1rem;
    }

    .right {
      height: 1rem;
      //background-color: #9B0000;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      padding: .1rem;

      p {
        color: #333;
        font-size: .14rem;
      }
    }
  }


  h2 {
    font-size: .2rem;
    padding: .2rem 0;
  }

}
</style>
