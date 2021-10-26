<template>
  <div class="big_item">
    <h4 v-if="name!=0">{{ name }}</h4>
    <div class="item_container">
      <div class="item" v-for="(v,k) in goodsList" :key="v.id" @click="toDetail(v.id)">
        <img :src="v.list_pic_url" alt="">
        <h4>{{ v.name }}</h4>
        <p>￥ {{ v.retail_price|toFixed }} 元</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortIItem",
  data() {
    return {};
  },
  methods: {
    // 进入详情页面
    toDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id: id
        }
      })
    }
  },
  computed: {},
  watch: {},
  props: {
    "goodsList": {
      type: Array,
      default: []
    },
    "name": {
      type: String,
      default: ""
    }
  },
  components: {},
  created() {

  },
  filters: {
    toFixed(value) {
      return value.toFixed(2)
    }
  }
};
</script>

<style lang="less" scoped>
.big_item {
  width: 100%;
  background-color: #fff;
  padding-bottom: .5rem;
  padding-top: .4rem;

  h4 {
    text-align: center;
    height: .5rem;
    line-height: .5rem;
    font-size: .2rem;
  }

  .item_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      width: 1.84rem;
      height: 2.4rem;
      //background-color: #8B0000;
      margin-bottom: .1rem;

      img {
        display: block;
        width: 1.84rem;
        height: 1.84rem;
      }

      h4 {
        font-size: .14rem;
        color: #333;
        height: .3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: .3rem;
      }

      p {
        font-size: .14rem;
        color: #8B0000;
        text-align: center;
        margin-top: .1rem;
      }
    }
  }
}
</style>
