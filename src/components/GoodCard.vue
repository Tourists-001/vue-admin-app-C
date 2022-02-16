<template>
<div class="good-card-container van-hairline--bottom">
  <div class="card-img">
    <img :src="images[0]" ref="img">
  </div>
  <div class="card-content">
    <div class="title overflow-hidden">
      {{title}}
    </div>
    <div class="desc overflow-hidden">
      {{desc}}
    </div>
    <div class="tags">
      <div v-for="(t,i) in tags" :key="i">{{t}}</div>
    </div>
    <div class="prices">
      {{`￥${price}`}}
    </div>
    <div class="counter">
      <div @touchend="counter(id,-1)" v-show="num"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"></div>
      <div class="num" v-show="num">{{num}}</div>
      <div @touchend="counter(id,+1)"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"></div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '@/tools/Animate/index';

export default {
  props: ['images', 'desc', 'title', 'price', 'tags', 'id', 'num', 'nofly'],
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num) {
      this.storageChange({ id, value: num });
      if (num === -1) {
        return;
      }
      if (this.nofly) {
        return;
      }
      // 图片的位置
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      const shopCar = document.getElementById('shop-car');
      // 购物车的位置
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      // 购物车的大小
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      // 终止位置和起始位置
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        width: imgWidth,
        height: imgHeight,
        src: this.$refs.img.src,
      });
    },
  },

};
</script>

<style lang="less" scoped>
.good-card-container {
  width: 100%;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  .card-img {
    width: 90px;
    margin-right:20px;
    img{
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    >div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      >div{
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border-radius: 3px;
        border: 1px solid #eee;
        margin-right: 5px;
      }
    }
    .prices {
      padding-top: 10px;
      font-weight: bold;
      color: #ff1a90;
      font-size: 14px;
    }
    .counter {
      position: absolute;
      bottom: 0px;
      right: 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      >div:not(.num){
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding: 0 5px;
      }
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
