<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item disabled v-model="value0" :options="option0"/>
      <van-dropdown-item title="价格" v-model="value1" :options="option1" @change="priceChange"/>
      <van-dropdown-item title="分类" v-model="value2" :options="option2" @change="typeChange"/>
    </van-dropdown-menu>
    <div class="big_box">
      <sort-i-item :goods-list="searchGoods" name=""></sort-i-item>
    </div>
  </div>
</template>

<script>
import SortIItem from "@/components/SortIItem";

export default {
  name: "GoodsSearchPage",
  data() {
    return {
      value0: "A",
      value1: "",
      value2: 0,
      option0: [
        {text: '综合', value: "A"},
      ],
      option1: [
        {text: '价格由高到低', value: 0},
        {text: '价格由低到高', value: 1},
      ],
      option2: [
        // {text: '默认排序', value: 0},
        // {text: '好评排序', value: 1},
        // {text: '销量排序', value: 2},
      ],
    };
  },
  methods: {
    // 价格变化的传值
    priceChange(value) {
      this.$emit('priceSort', value)
    },
    typeChange(value) {
      this.$emit('typeChange', value)
    }
  },
  computed: {},
  watch: {},
  props: {
    "searchGoods": {
      type: Array,
      default: []
    },
    "typeList": {
      type: Array,
      default: []
    },
    "dataSelect": {
      type: String,
      default: ''
    }
  },
  components: {SortIItem},
  created() {
    console.log(this.searchGoods, this.typeList)
    this.typeList.forEach((item) => {
      this.option2.push({
        text: item.name,
        value: item.id
      })
    })
  }
};
</script>

<style lang="less" scoped>
.big_box {
  width: 100%;
  height: 5.66rem;
  overflow: auto;
}
</style>
