import request from "@/request/request";

// 请求首页的数据
export const GetHomeList = () => request.get('/index/index')
export const GetPopupData = () => request.get('/search/index')
export const GetSearchList = (params) => request.get('/search/helper', {params})
export const GetSortedData = () => request.get('/catalog/index')

