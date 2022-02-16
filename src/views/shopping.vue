<template>
  <div class="shopping-container">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="del"
/>
    </div>
    <div class="card-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div class="card-box" v-for="(item, i) in list" :key="i">
        <van-checkbox :name="item.id" class="check"></van-checkbox>
        <GoodCard v-bind="item" :num="counterMap[item.id]" :nofly="true"/>
        </div>
      </van-checkbox-group>
    </div>
    <div class="shop-bottom">
      <van-submit-bar :price="AllMoney" :button-text="`提交订单(${total})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="clickAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import { mapMutations, mapState } from 'vuex';
import { Dialog, Toast } from 'vant';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      checked: false,
      result: [],
      list: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    ...mapMutations(['storageChange']),
    AllMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((pre, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + pre;
      }, 0);
    },
    total() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((pre, next) => pre + (this.counterMap[next.id] || 0), 0);
      return res;
    },
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    clickAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    onSubmit() {},
    async del() {
      if (this.result.length === 0) {
        // eslint-disable-next-line no-undef
        Toast.fail('没有选择任何商品');
      }
      try {
        await Dialog.confirm({ message: '是否删除' });
        // this.result.forEach((id) => {
        //   this.storageChange({ id, value: -Infinity });
        //   this.list = this.list.filter((item) => !this.result.includes(item.id));
        // });
      } catch (error) {
        Toast('已取消');
      }
    },
    getGoodsList() {
      const value = Object.keys(this.counterMap);
      this.$api.getGoodsByIds(value.join()).then(({ list }) => {
        this.list = list;
        console.log(this.list);
      });
    },
  },

};
</script>

<style lang="less" scoped>
.shopping-container {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background-color: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .shop-bottom {
    .van-submit-bar {
        bottom: 50px;
      }
    }
}
</style>
