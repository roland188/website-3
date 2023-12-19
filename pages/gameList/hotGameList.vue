<!-- 游戏列表 -->
<template>
      <!-- 右侧列表 -->
    <view class="secondList">
      <view>
        <image
          class="banner-img"        
          :src="require('../../static/image/indexImg/hot-banner.png')"
          mode="widthFix"
          alt=""
          ></image>
      </view>
      <block v-for="(item, index) in gameList" :key="index">
          <!-- :class="[1,2,4,6].includes(id) ? 'game1' : ''"  -->
          <view
          class="game"
              :class="'game1'"
          >
          <view
              class="inner inner1"
              @tap="difference(gamemenusparent, item, navIndex, index)"
          >
              <image
              class="img"
              :src="
                  item.imgUrlApp
                  ? $config.getImgUrl(item.imgUrlApp)
                  : item.pictureUrl
                  ? $config.getImgUrl(item.pictureUrl)
                  : noDate
              "
              mode="widthFix"
              alt=""
              ></image>

              <view class="title">{{ item.name }}</view>
          </view>
          </view>
      </block>
      <view class="content-about">
        <span class="title">{{ $t('关于在线娱乐场XOC88') }}</span>
        <span class="content">{{ $t(' XOC88在线娱乐场是一家获得马恩岛经济特区和卡加延省经济特区自由港授权的合法在线博彩许可证的娱乐场。"在线娱乐场"的目标是确保客户与公司之间的公平，并充分展示客观品质和能力...') }}</span>        
      </view>
    </view>
  </template>
  
  <script>
  export default {
    props: {
      gameList: Array,
      navIndex: Number,
      gamemenusparent: [Object, Array],
    },
    data() {
      return {
        noDate: require("@/static/image/gameerror.png"),
        id: 1,
      };
    },
    created(){
    },
    mounted() {    
             
    },
    methods: {
      difference(gamemenusparent, item, navIndex, index) {
        this.$emit("difference", {
          gamemenusparent,
          item,
          navIndex,
          index,
        });
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  
  .secondList {
    background: url("../../static/image/indexImg/hot-back.png");
    .banner-img {
      width: 100%;
    }
  }
    
  // 游戏列表
  .gamelist {
    width: 100%;
    .nav {
      z-index: 1;
      color: #9ea9b3;
      overflow-x: auto;
      background-color: #0f0f0f;
      position: relative;
      // height: 92upx;
      margin-bottom: 16upx;
      padding: 0.2rem 6upx;
      background-color: #3a3a3a;
      white-space: nowrap;
      line-height: 60rpx;
      
  
      .con {
        display: inline-flex;
        vertical-align: middle;
        /* height: 41px; */
        line-height: 1.2rem;
        padding: 0 14px;
        color: #fff;
        font-size: .8125rem;
        width: min-content;
        font-weight: 500;
        border-radius: 30px;      
        flex-direction: column;
        align-items: center;
        .bgicon {
          width: 2.185rem;
          height: 2.185rem;
          margin-right: 10upx;
          margin-top: 6upx;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          margin-top: 0.1rem;
        }
      }
  
      .con:nth-child(1) {
        margin-top: 0;
      }
  
      .con-active {
        // background: linear-gradient(85.62deg,#fead00 10.63%,#ffc54a 102.31%);
        background-repeat: no-repeat;
        background-size: cover;
        color: #ff9000;
      }
    }
    .secondList {
      position: relative;
      // padding-left: 25%;
      // max-height: 784upx;
      overflow-y: auto;
      .game {
        flex: 1;
        // height: 226upx;
        margin-bottom: 2%;
        padding: 0.1875rem 0.625rem;
        overflow: hidden;
        border-radius: 25upx;
        // background: url("../../static/image/indexImg/game-bg.png") no-repeat center/contain;
        .inner {
          position: relative;
          width: 100%;
          padding-top: 100%;
          .img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
  
          .title {
            position: absolute;
            right: 9%;
            bottom: 17%;
            width: 8.125rem;
            height: 2.3125rem;
            font-size: .8125rem;
            display: -webkit-box;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
          }
        }
      }
      // .game1 {
      //   float: left;
      //   width: 98%;
      //   margin-left: 2%;
      //   margin-bottom: 2%;
      //   background: url("../../../static/image/indexImg/game1-bg.png") no-repeat center/contain;
      //   .inner1 {
      //     width: 100%;
      //     padding-top: 44%;
      //   }
      // }
    }

    .content-about {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-size: 1.25rem;
        align-items: center;
        margin-bottom: 0.625rem;
        padding: 0 0.9375rem;
      }
      .content {
        padding: 0 0.9375rem 5.625rem;
        font-size: .875rem;
        line-height: 1.875rem;
      }
    }
  }
  </style>
  