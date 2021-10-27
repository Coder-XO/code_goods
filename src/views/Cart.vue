<template>
  <div class="cart">
    <div class="innerBox">
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
      <!--    商品列表-->
      <van-checkbox-group v-model="result" :disabled="!isShow">
        <van-checkbox v-for="(v,k) in cartList" :name="String(v.product_id)"
                      @click="fuck(v.checked,v.product_id,v.goods_id,v.id)">
          <van-card
              :key="v.id"
              :num="v.number"
              :price="`${toFixed(parseFloat(v.market_price))}`"
              :title="v.goods_name"
              :thumb="v.list_pic_url"
          >
            <template #footer>
              <van-stepper v-model="v.number" v-if="!isShow" @change="fu"/>
            </template>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <!--    结算     -->
    <van-submit-bar :price="biged(totalPrice)" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="allSelect" :disabled="!isShow">全选</van-checkbox>
      <div v-show="isShow" class="wrap">
        累计共{{ goodsCount }}件商品,可点击
        <van-button type="primary" @click="isShow=false">编辑</van-button>
        按钮进行商品数量修改
      </div>
      <div v-show="!isShow" class="wrap">
        累计共{{ goodsCount }}件商品，可点击
        <van-button type="danger" @click="isShow=true">完成编辑</van-button>
        按钮进行商品勾选
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
import {Toast} from "vant";
import axios from "axios";
import {ChangeChecked, CartUpdate} from "@/request/api";

export default {
  name: "Cart",
  data() {
    return {
      result: [],
      cartList: [],
      checked: false,    // 全选
      isShow: true,      // 禁用与否
      totalPrice: 0,   // 合计
      goodsCount: 0,    // 商品数量
      //  当前的步进器接口所需数据
      currentGoodsId: 0,
      currentId: 0,
      currentProductId: 0
    };
  },
  methods: {
    // 乘100
    biged(value) {
      return value * 100
    },
    //     步进器执行的函数
    fu(v) {
      // 为了先获取到  步进器接口的数据  异步执行  接口
      setTimeout(() => {
        CartUpdate({
          goodsId: this.currentGoodsId,
          id: this.currentId,
          number: v,
          productId: this.currentProductId
        }).then((res) => {
          console.log(res)

          // 更新  数量与  总价
          // 请求用户的购物车数据
          axios.post('http://kumanxuan1.f3322.net:8001/cart/index', {}, {
            headers: {
              'X-Nideshop-Token': localStorage.getItem('token')
            }
          }).then(res => {
            this.goodsCount = res.data.data.cartTotal.checkedGoodsCount
            this.totalPrice = res.data.data.cartTotal.checkedGoodsAmount
          })
        })
      })
    },
    // 全选事件
    allSelect() {
      if (!this.isShow) {    // 禁用了
        return
      }
      let ids = []
      this.cartList.forEach((item) => {
        ids.push(String(item.product_id))
      })
      if (!this.checked) {    // 全选
        ChangeChecked({isChecked: 0, productIds: ids}).then(res => {
          console.log(res)
        })
        this.result = []
      } else {    // 全不选

        console.log('fuckkk')
        ChangeChecked({isChecked: 1, productIds: ids}).then(res => {
          console.log(res)
        })
        this.result = []
        this.cartList.forEach((item) => {
          this.result.push(String(item.product_id))
        })
      }
    },
    onSubmit() {

    },
    onClickEditAddress() {

    },
    // 小数转换
    toFixed(value) {
      return value.toFixed(2)
    },
    // 切换状态
    fuck(checked, pId, gid, id) {
      //   当前的步进器接口数据传递
      this.currentGoodsId = gid
      this.currentProductId = pId
      this.currentId = id
      if (!this.isShow) {    // 禁用了
        return
      }
      console.log(checked)
      let isChecked = 0
      if (checked == 0) {
        isChecked = 1
      }
      ChangeChecked({isChecked: isChecked, productIds: pId}).then(res => {
        console.log(res)
        this.goodsCount = res.data.cartTotal.checkedGoodsCount
        this.totalPrice = res.data.cartTotal.checkedGoodsAmount

        // 更新当前的数据
        // 请求用户的购物车数据
        axios.post('http://kumanxuan1.f3322.net:8001/cart/index', {}, {
          headers: {
            'X-Nideshop-Token': localStorage.getItem('token')
          }
        }).then(res => {
          console.log(res)

          // 判断是否为全选
          if (res.data.data.cartTotal.checkedGoodsAmount == res.data.data.cartTotal.goodsAmount) {
            this.checked = true
          }
          // 数据赋值
          this.cartList = res.data.data.cartList
          this.goodsCount = res.data.data.cartTotal.checkedGoodsCount
          this.totalPrice = res.data.data.cartTotal.checkedGoodsAmount
          // 保存选中状态
          console.log(this.cartList)
          this.result = []
          this.cartList.forEach((item) => {
            if (item.checked == 1) {
              this.result.push(String(item.product_id))
            }
          })
          console.log(this.result)
        })
      })
      if (this.result.length == this.cartList.length) {   // 全选了
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  computed: {},
  watch: {
    // // 选中状态变化了
    // result: {
    //   handler(newValue, oldValue) {     // 改变状态
    //     if (newValue.length > oldValue.length) {   // 添加选中
    //       console.log('添加')
    //       ChangeChecked({isChecked: '1', productIds: `${newValue[newValue.length - 1]}`}).then(res => {
    //         console.log(res)
    //       })
    //     } else {   // 减少选中
    //       console.log('减少')
    //       ChangeChecked({isChecked: '0', productIds: `${oldValue[oldValue.length - 1]}`}).then(res => {
    //         console.log(res)
    //       })
    //     }
    //   }
    // }
  },
  props: {},
  components: {},
  created() {
    console.log(this.result)
    // 加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 200
    });
    // 请求用户的购物车数据
    axios.post('http://kumanxuan1.f3322.net:8001/cart/index', {}, {
      headers: {
        'X-Nideshop-Token': localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res)

      // 判断是否为全选
      if (res.data.data.cartTotal.checkedGoodsAmount == res.data.data.cartTotal.goodsAmount) {
        this.checked = true
      }
      // 数据赋值
      this.cartList = res.data.data.cartList
      this.goodsCount = res.data.data.cartTotal.checkedGoodsCount
      this.totalPrice = res.data.data.cartTotal.checkedGoodsAmount
      // 保存选中状态
      console.log(this.cartList)
      this.result = []
      this.cartList.forEach((item) => {
        if (item.checked == 1) {
          this.result.push(String(item.product_id))
        }
      })
      console.log(this.result)
    })
  },
  filters: {
    toFixed(value) {
      return value.toFixed(2)
    }
  },
};
</script>

<style lang="less" scoped>

.cart {
  padding-bottom: .5rem;
}

//退货等
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

div.van-checkbox-group {
  background-color: #fff;

  div.van-card {
    background-color: #FAFAFA;
    width: 3.2rem;
  }

  div.van-card__title {
    font-size: .18rem;
    color: #323232;
    height: .4rem;
    margin-top: .2rem;
  }

  div.van-checkbox {
    padding: 0 .1rem;
  }
}

div.van-submit-bar {
  position: fixed;
  bottom: .5rem;
}

div.innerBox {
  height: 5.2rem;
  overflow: auto;
}

div.van-submit-bar__tip {

}

div.wrap {
  position: fixed;
  bottom: 1rem;
  background-color: #FFF7CC;
  width: 3.56rem;
  left: .1rem;
  z-index: 999;
  font-size: .12rem;
  box-sizing: border-box;
  padding: 0 .1rem;
  color: #f56723;
}
</style>
