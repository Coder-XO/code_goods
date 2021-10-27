import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Toast} from 'vant';
import '../vantui'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            active: 0
        },
        children: [
            {
                path: '/home/SearchPopup',
                name: 'SearchPopup',
                component: () => import("../views/SearchPopup.vue")
            }
        ]
    },
    {
        path: '/topic',
        name: 'Topic',
        meta: {
            active: 1
        },
        component: () => import("../views/Topic")
    },
    {
        path: '/type',
        name: 'Type',
        meta: {
            active: 2
        },
        children: [
            {
                path: '/type/SearchPopup',
                name: 'typeSearch',
                component: () => import("../views/SearchPopup.vue")
            }
        ],
        component: () => import("../views/Type")
    },
    {
        path: '/cart',
        name: 'Cart',
        meta: {
            active: 3
        },
        component: () => import("../views/Cart")
    },
    {
        path: '/me',
        name: 'Me',
        meta: {
            active: 4
        },
        component: () => import("../views/Me")
    },
    {
        path: '/channel',
        name: 'Channel',
        component: () => import("../views/Channel")
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("../views/GoodsDetail")
    },
    {
        path: '/brand',
        name: 'Brand',
        component: () => import("../views/Brand")
    }
]


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.name === 'Cart') {
        if (!localStorage.getItem('token')) {
            // 加载提示
            Toast.loading({
                message: '请先登录...',
                forbidClick: true,
                duration: 1000
            });
            setTimeout(() => {
                router.push({
                    path: '/me'
                })
            }, 1000)
            localStorage.setItem('prePath', from.path)
            return
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
