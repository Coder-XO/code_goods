import request from "@/request/request";

// 请求首页的数据
export const GetHomeList = () => request.get('/index/index')
export const GetPopupData = () => request.get('/search/index')
export const GetSearchList = (params) => request.get('/search/helper', {params})
export const GetGoodsList = (params) => request.get('/goods/list', {params})
export const DeleteAllHot = () => request.get('/search/clearhistory')
export const GetTopicList = (params) => request.get('/topic/list', {params})
export const GetTypeList = () => request.get('/catalog/index')
export const GetCurrentTypeList = (params) => request.get('/catalog/current', {params})
export const GetCurrentGood = (params) => request.get('/goods/detail', {params})
export const GetRelatedGoods = (params) => request.get('/goods/related', {params})
export const GetBrandDetail = (params) => request.get('/brand/detail', {params})
export const DoLogin = (params) => request.post('/auth/loginByWeb', params)
export const ChangeChecked = (params) => request.post('/cart/checked', params)
export const CartUpdate = (params) => request.post('/cart/update', params)
