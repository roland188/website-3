<!-- 游戏列表 -->
<template>
      <!-- 右侧列表 -->
    <view class="secondList">
      <block v-for="(item, index) in gameList" :key="index">
          <!-- :class="[1,2,4,6].includes(id) ? 'game1' : ''"  -->
          <view
          class="game"
              :class="'game1'"
          v-if="item.name !== $t('捕鱼达人')"
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
    </view>
  </template>
  
  <script>
  export default {
    props: {
      gameList: Array,
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
  </style>
  