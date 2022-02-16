import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    GoodsList: [],
    size: 5,
    sortType: null,
    types: 1,
    counterMap: {},
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.GoodsList = [...this.state.GoodsList, ...list];
    },
    resetGoodList(state) {
      state.GoodsList = [];
    },
    setGoodsType(state, type) {
      state.sortType = type;
    },
    setType(state, type) {
      state.types = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1)) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    // 获取侧边列表数据
    async getSideList({ commit }, type) {
      commit('setShowContent', false);// 控制loading的变化
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
    },
    // 获取商品列表数据
    async getGoodsList({ commit, state }, options) {
      const { type } = options;
      const { page } = options;
      const sortType = options.sortType || this.state.type;
      const { list, total } = await api.getGoodsList(type, page, this.state.size, sortType);
      commit('setType', type);
      commit('setGoodsList', list);
      commit('setGoodsType', sortType);
      if (total > state.GoodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
