<template>
  <div class="brand">
    <div>
      <img :src="brandData.list_pic_url" alt="">
      <h2>{{brandData.name}}</h2>
    </div>
    <p>{{brandData.simple_desc}}</p>
  </div>
</template>

<script>
import {GetBrandDetail} from "@/request/api";

export default {
  name: "Brand",
  data() {
    return {
      brandData: {}
    };
  },
  methods: {},
  computed: {},
  watch: {},
  props: {},
  components: {},
  created() {
    GetBrandDetail({id: this.$route.query.id}).then(res => {
          this.brandData = res.data.brand
        },
        err => {
          console.log(err)
        })
  }
};
</script>

<style lang="less" scoped>
.brand {
  position: fixed;
  top: -.21rem;
  width: 100%;
  //height: 1rem;
  background-color: #9B0000;

  img {
    display: block;
    width: 100%;
  }

  h2 {
    position: absolute;
    left: 0;
    top: -1.1rem;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: auto;
    font-size: 20px;
    text-decoration: underline;
    color: #fff;
  }

  p {
    background: #fff;
    font-size: 18px;
    text-align: center;
    padding: 20px 10px;
    line-height: 26px;
    color: #666;
  }
}
</style>
