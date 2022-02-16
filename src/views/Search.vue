<template>
  <div class="search-container">
    <!-- header -->
    <div class="search-header">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"/>
        <van-search
        class="search-content"
          v-model="value"
          show-action
          :placeholder="place"
          @search="onSearch"
          @input="input"
          @focus="focus"
  >
  <template #action v-if="showList">
    <div @touchend="onSearch(value)">搜索</div>
  </template>
    <template #action v-else>
    <van-icon name="shopping-cart-o" id="shop-car" class="shop-car" :badge="badge" @click="click"/>
  </template>
  </van-search>
    </div>
    <!-- 下拉列表 -->
    <div class="search-list" v-if="likeList.length && showList">
      <van-list>
      <van-cell
        v-for="item in likeList"
        :key="item"
        @click="onSearch(item)"
        >
      <template>
        <span class="custom-title" v-html="formateHTML(item)"></span>
      </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <GoodCard v-for="(item,i) in GoodsList" :key="i" v-bind="item"
        :num="counterMap[item.id]"/>
        </van-list>
    </div>
    <div class="history-list" v-show="likeList.length <= 0 && showList">
      <MyHistory :searchList="searchList" @search="onSearch" class="my-history"/>
    </div>
  </div>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import MyHistory from '@/components/MyHistory.vue';

import { mapState } from 'vuex';

export default {
  components: {
    GoodCard,
    MyHistory,
  },
  data() {
    return {
      value: this.place,
      place: '酒',
      likeList: [],
      timer: null,
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      size: 8,
      GoodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const value = Object.values(this.counterMap).reduce((pre, next) => pre + next, 0);
      if (value === 0) {
        return '';
      } if (value > 99) {
        return '99+';
      }
      return value;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList'));
  },
  methods: {
    click() {
      this.$router.push('/home/shopping');
    },
    async onLoad() {
      const value = await this.$api.search(this.value, this.page, this.size);
      this.GoodsList = [...this.GoodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.GoodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    formateHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
    onSearch(value) {
      this.showList = false;
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      // 历史记录
      this.searchList.unshift({
        value: this.value,
        time: new Date().getTime(),
      });
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time); // 对搜索记录进行排序
      } else {
        this.searchList.unshift({
          value: this.value,
          time: new Date().getTime(),
        }); // 为searchList插入一个对象
        if (this.searchList.length >= 11) {
          this.searchList.pop(); // 删除最后一个元素
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },
    async input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      // 防抖
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
  },

};
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #fff;
  .search-header {
    z-index: 22;
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-left: 15px;
    position: fixed;
    top: 0;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
    }
  }
  .search-list {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 40px;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 45px auto 0;
    z-index: 10;
    background: #fff;
    // overflow: auto;
  }
  .shop-car{
    font-size: 15px;
  }
  .my-history {
    width: 350px;
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 1;
  }
}
</style>
