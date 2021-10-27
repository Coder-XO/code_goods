<template>
  <div class="me">
    <div class="top">
      <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+BAMAAAAQDbi7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfjz8NTIvOPa0drQxe3l3/Pt6dJ8uJYAAAGKSURBVFjD7ZjNboMwEIT5vccxuZPS3qHJA4SouQPp+z9LkSJVBduw42mEqnrun9de744XoigoKCgoKCjoN5V/VI1Sp5eLH34d4YdePejPb3rUGQ+uJkIXiNVMJcanc35P8uAGEsVtwOQVVAWZyddkfOgAR5NXHZN+7AZs4YEE5DZcHZjsjyq44wMXYOe1f/c9FPg/wqdP4TXjHlD9sjzbfxnZ/3b/2Mn9q+H8y+5/cv8crPyppI4vv8DEwWuu/MV8vHH89En5K6jyBxrAwddU+QIF3Nv5jvMfTfa/3D+ilpx/soac3zJy/oyI7NkdsMD4lhp/LR4AfoQl3PeHkYAa5Xsm+0YNlzAf3ZnTz0poF/j/xl9/NoB+v2H0YPgHskJWWZ/fm8/WJ3uQvEB5pZzSb17WD/yIGdSK9h2FLy8gwJcWEOFuN0qUUGefzK/a6VGMK90t++2qCvHQ59BFNLK4deDCGxnoQX5+BQ3KF9T25y9yDPPTabbF+dKz9qwTSUPyOD59U7bmm634LwhiuCxbAoGfAAAAAElFTkSuQmCC"
          alt="" ref="avatar">
      <h2 @click="doLogin" v-if="isLogin">
        <span>点击登录</span>
        <span>&gt;</span>
      </h2>
      <h2 v-if="!isLogin">
        <span>{{ realUserName }}</span>
        <span @click="loginOut">X</span>
      </h2>
    </div>
    <van-overlay :show="show" @click="fuck">
      <div class="wrapper">
        <div class="block" @click.stop>
          <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {Toast} from "vant";
import {DoLogin} from "@/request/api";
import {Dialog} from 'vant';

export default {
  name: "Me",
  data() {
    return {
      show: false,
      username: 'OYQS',
      password: '123456789',
      isLogin: true,
      realUserName: ''
    };
  },
  methods: {
    // 退出登录
    loginOut() {
      Dialog.confirm({
        title: '退出账号确认',
        message: '确定要退出账号吗?',
      })
          .then(() => {
            // 清空本地存储
            localStorage.clear()
            // 换头像
            this.$refs.avatar.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+BAMAAAAQDbi7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfjz8NTIvOPa0drQxe3l3/Pt6dJ8uJYAAAGKSURBVFjD7ZjNboMwEIT5vccxuZPS3qHJA4SouQPp+z9LkSJVBduw42mEqnrun9de744XoigoKCgoKCjoN5V/VI1Sp5eLH34d4YdePejPb3rUGQ+uJkIXiNVMJcanc35P8uAGEsVtwOQVVAWZyddkfOgAR5NXHZN+7AZs4YEE5DZcHZjsjyq44wMXYOe1f/c9FPg/wqdP4TXjHlD9sjzbfxnZ/3b/2Mn9q+H8y+5/cv8crPyppI4vv8DEwWuu/MV8vHH89En5K6jyBxrAwddU+QIF3Nv5jvMfTfa/3D+ilpx/soac3zJy/oyI7NkdsMD4lhp/LR4AfoQl3PeHkYAa5Xsm+0YNlzAf3ZnTz0poF/j/xl9/NoB+v2H0YPgHskJWWZ/fm8/WJ3uQvEB5pZzSb17WD/yIGdSK9h2FLy8gwJcWEOFuN0qUUGefzK/a6VGMK90t++2qCvHQ59BFNLK4deDCGxnoQX5+BQ3KF9T25y9yDPPTabbF+dKz9qwTSUPyOD59U7bmm634LwhiuCxbAoGfAAAAAElFTkSuQmCC\n'
            this.isLogin = true
          })
          .catch(() => {
            // on cancel
          });
    },
// 登录
    doLogin() {
      this.show = true
    }
    ,
    fuck() {
      this.show = false
    }
    ,
    onSubmit() {
      DoLogin({username: this.username, pwd: this.password}).then(res => {
            console.log(res)
            if (res.errno === 0) {  // 登录成功
              // 存token
              localStorage.setItem('token', res.data.token)
              //  登录框 消失
              this.isLogin = false
              this.show = false
              // 加载提示
              Toast.success('登陆成功');
              // 返回上一个路由
              setTimeout(() => {
                if (localStorage.getItem('prePath')) {
                  if (localStorage.getItem('prePath') === '/detail') {    // 详情页的返回
                    Toast.loading({
                      message: '返回上一页面...',
                      forbidClick: true,
                      duration: 1000
                    });
                    setTimeout(() => {
                      this.$router.go(-1)
                      localStorage.removeItem('prePath')
                    }, 1000)

                  } else {
                    Toast.loading({
                      message: '返回上一页面...',
                      forbidClick: true,
                      duration: 1000
                    });
                    setTimeout(() => {
                      this.$router.push({
                        path: localStorage.getItem('prePath')
                      })
                      localStorage.removeItem('prePath')
                    }, 1000)

                  }
                }

              }, 200)
              // 存用户名
              this.realUserName = res.data.userInfo.username
              localStorage.setItem('username', res.data.userInfo.username)
              // 存头像
              this.$refs.avatar.src = res.data.userInfo.avatar
              localStorage.setItem('avatar', res.data.userInfo.avatar)
            }
          },
          err => {
            console.log(err)
          })
    }
  },
  computed: {}
  ,
  watch: {}
  ,
  props: {}
  ,
  components: {}
  ,
  created() {
    // 加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 200
    });
    document.addEventListener('click', function () {
      this.show = false
    })
    // window.

    // 获取本地用户信息
    console.log(8888)
    this.realUserName = localStorage.getItem('username')
    // 判断是否登录
    if (localStorage.getItem('token')) {
      this.isLogin = false
    }


  }
  ,
  mounted() {    // 头像的设置
    if (localStorage.getItem('avatar')) {
      this.$refs.avatar.src = localStorage.getItem('avatar')
    }
  }
}
;
</script>

<style lang="less" scoped>
.me {

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 3.3rem;
    height: 2.8rem;
    background-color: white;

    form {
      margin-top: .6rem;
    }
  }


  .top {
    background-color: #333333;
    width: 100%;
    height: 1.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem .1rem;
    box-sizing: border-box;

    img {
      display: block;
      width: .7rem;
      height: .7rem;
      border-radius: 50%;
    }

    h2 {
      width: 2.61rem;
      font-size: .14rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
