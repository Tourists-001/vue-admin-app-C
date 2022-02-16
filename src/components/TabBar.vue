/* eslint-disable guard-for-in */
<template>
  <van-tabbar route fixed>
  <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
  <van-tabbar-item
  :badge="badge"
  icon="cart-o"
  to="/home/shopping"
  id="shop-car"
  >购物车</van-tabbar-item>
  <van-tabbar-item icon="user-circle-o" to="/home/about">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const value = Object.values(this.counterMap).reduce((pre, next) => pre + next, 0);
      if (value === 0) {
        return 0;
      } if (value > 99) {
        return '99+';
      }
      return value;
    },
  },
};
</script>

<style>

</style>
