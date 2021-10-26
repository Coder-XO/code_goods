<template>
  <div id="app">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>
<script>
import Home from "@/views/Home";
import TabBar from "@/components/TabBar";

export default {
  name: 'App',
  data() {
    return {
      value: 3,
    }
  },
  components: {
    TabBar,
    Home
  }
}
</script>
<style lang="less">
#app {
  background-color: #efefef;
  //min-height: 100%;
  font-size: .16rem;
  height: 100%;
  width: 100%;
}

html, body {
  height: 100%;
  width: 100%;
  font-size: 100px !important;
}
</style>
