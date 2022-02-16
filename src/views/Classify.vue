<template>
  <div class="classify-container">
    <!-- 搜索区域 -->
    <router-link class="search-area" to="/search">
      <van-icon name="search" />
      <div>特价苹果,10元三斤</div>
    </router-link>
    <!-- 一级导航 -->
    <OneTab />
    <template v-if="this.$store.state.showContent">
      <SideBar />
      <GoodsList/>
    </template>
    <van-loading color="#1989fa" size="1.5rem" vertical v-else-if="!this.$store.state.showContent"/>
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },

};
</script>

<style lang="less" scoped>
.classify-container {
  width: 375px;
  .search-area {
    display: block;
    width: 355px;
    height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    line-height: 33px;
    text-align: center;
    color: #a1a1a1;
    font: 14px;
    >*{
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
