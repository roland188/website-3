<!-- 游戏列表 -->
<template>
      <!-- 右侧列表 -->
    <view class="hotGameList">
      <view>
        <image
          class="banner-img"        
          :src="require('../../static/image/indexImg/hot-banner.png')"
          mode="widthFix"
          alt=""
          ></image>
      </view>
      <view v-for="(item, index) in gameList" 
        :key="index" 
        class="gameItem"
        @tap="difference(gamemenusparent, item, navIndex, index)">
        
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
  .hotGameList {
    width: 100%;
    background: url("../../static/image/indexImg/hot-back.png");
    .banner-img {
      width: 100%;
    }
    .gameItem {
      padding: 0.1875rem 0.625rem;
      position: relative;
      margin-bottom: 0.3125rem;
      .img {
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
  