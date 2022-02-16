<template>
  <div class="goods-list-container">
    <!-- header search -->
    <div class="van-hairline--top-bottom list-header">
      <div :class="{ active: type === 'all' }" @click="changeType('all')">综合</div>
      <div :class="{ active: type === 'sale' }" @click="changeType('sale')">销量</div>
      <div
      :class="{ 'price-up' : type == 'price-up', 'price-down' : type == 'price-down'}"
      class="price"
      @click="changeType('price')"
      >价格</div>
    </div>
    <!-- list area -->
    <div class="list-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :animation-duration='300'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <GoodCard v-for="(item,i) in GoodsList" :key="i" v-bind="item" :num="counterMap[item.id]"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import GoodCard from '@/components/GoodCard.vue';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      GoodsList: (state) => state.GoodsList,
      types: (state) => state.types,
      counterMap: (state) => state.counterMap,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodList']),
    ...mapActions(['getGoodsList']),
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const res = await this.getGoodsList(
        { type: this.types, page: this.page, sortType: this.type },
      );
      if (res) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      this.loading = false;
      this.isLoading = true;
      this.finished = false;
      this.page = 1;
      this.resetGoodList();
      await this.getGoodsList({ type: this.types, page: 1, sortType: this.type });
      this.isLoading = false;
    },
    changeType(type) {
      if (type === 'all') {
        this.type = 'all';
      } else if (type === 'sale') {
        this.type = 'sale';
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list-container {
  width: 375px;
.list-header {
  width: 294px;
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: 79px;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
  >div{
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-weight: bold;
    color: #cecece;
    position: relative;
    }
    .active, .price-up, .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::after {
      content:'';
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content:'';
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after{
      border-top-color: #ff1a90;
    }
  }
}
.list-container {
  width: 296px;
  position: fixed;
  top: 175px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
    // overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
}
</style>
