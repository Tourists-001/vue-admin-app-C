import axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = 'youke001_1644312591026';

const request = axios.create({
  baseURL,
  params: {
    appkey,
  },
});
// 拦截器
request.interceptors.response.use((value) => value.data);
// 获取侧边列表
const getSideList = (type) => request.get(
  URLS.getSide,
  { params: { type } },
);

// 获取商品列表
const getGoodsList = (type, page, size, sort) => request.get(
  URLS.getGoodsList,
  {
    params: {
      type, size, page, sort,
    },
  },
);
// 搜索列表
const likeSearch = (value) => request.get(
  URLS.likeSearch,
  {
    params: {
      likeValue: value,
    },
  },
);
// 搜索内容
const search = (type, page, size) => request.get(
  URLS.search,
  {
    params: {
      type,
      page,
      size,
    },
  },
);
// 根据id获取商品列表
const getGoodsByIds = (value) => request.get(
  URLS.getGoodsByIds,
  {
    params: {
      value,
    },
  },
);
export default {
  getSideList,
  getGoodsList,
  likeSearch,
  search,
  getGoodsByIds,
};
