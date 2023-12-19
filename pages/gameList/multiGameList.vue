<!-- 游戏列表 -->
<template>
      <!-- 右侧列表 -->
    <view class="multiGameList">
      <view class="game-type">
        <view v-if="gameMenus.length > 0">
          <view class="switch">
            <view class="game-type-switch">
              <view :class="{'all-games': true, 'active': switchIndex == 1}" @click="changeSwitchIndex(1)">
                {{ $t('全部游戏') }}
              </view>
              <view :class="{'hot-games': true, 'active': switchIndex == 2}" @click="changeSwitchIndex(2)">
                {{ $t('热门游戏') }}
              </view>
            </view>
          </view>
          <!-- 左侧列表 -->
          <scroll-view class="nav" id="scrollContainer"
              :enable-flex="true"
              scroll-with-animation
              :throttle="true"
              :scroll-left="scrollLeft" scroll-x
            >
              <view
                class="con"
                :class="subNavIndex == index ? 'con-active' : ''"
                v-for="(item, index) in gameMenus"
                :key="index"
                
                @click="changeSubNavIndex(index, item)"
              >
                <view class="bgicon">
                  <image
                    class="img"
                    :src="$config.getImgUrl(item.imgUrlApp)"
                    mode="acpectFit"
                    alt=""
                  ></image>
                </view>
                <span>{{ item.name }}</span>
              
            </view>
            
          </scroll-view>

          <view class="game-search">
            <input class="game-search__input" type="text" :cursor-spacing="400" v-model.trim="keyword" :placeholder="$t('请输入游戏名称')" placeholder-style="color:#999;font-size:1rem">
            <image src="../../static/image/gs2.svg" class="game-search_s" @click="searchGame()" ></image>
          </view>
        </view>
      </view>
      
      <view v-if="dataList.length > 0" class="games">
        <block v-for="(item, index) in dataList" :key="index">
            <!-- :class="[1,2,4,6].includes(id) ? 'game1' : ''"  -->
            <view
            class="game"
            >
            <view
                class="inner inner1"
                @tap="difference(gamemenusparent, item, navIndex, index)"
            >
              <view class="game-image">
                <image
                  class="img"
                  :src="
                      item.imgUrlApp
                      ? $config.getImgUrl(item.imgUrlApp)
                      : item.pictureUrl
                      ? $config.getImgUrl(item.pictureUrl)
                      : noDate
                  "
                  alt=""
                  ></image>
              </view>
                

                <view class="title">{{ item.name }}</view>
            </view>
            </view>
        </block>
      </view>
      <view v-else class="search-none">
        <view class="none-con">
          <image
            class="none-img"
            :src="require('../../static/image/mb/null-data.png')"
            mode="widthFix"
          ></image>

          <view class="wen-none">{{ $t('这里空空的') }}</view>
          <view class="wen-none">{{ $t('什么都没有哦') }}</view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    props: {
      navIndex: Number,
      gameMenus: Array,
      gameId: Number,
    },
		watch: {
			gameId(newVal) {
				if(newVal) {
          this.initData();
        }
			},
		},
    data() {
      return {
        noDate: require("@/static/image/gameerror.png"),
        id: 1,
        switchIndex: 0,
        subNavIndex: 0,
        scrollLeft: 0,
        keyword: '',
        containerWidth: 0,
        clientRectWidth: 0,
        subNavItemWidth: 0,
        dataList: [],
        vendorId: "",
        pageNo: 1,
        pageSize: 21,
        gameKindId: "",
        over: false,
      };
    },
    created(){
    },
    onShow() {
    },
    mounted() {  
      
      this.$nextTick(() => {
        this.initData();
      });
    },
    
    onReachBottom() {
      this.pageNo = this.pageNo + 1;
      if (!this.over) {
        if (this.switchIndex == 0) {
          this.getVendorGame();
        } else {
          this.getGameByIds();
        }
      }
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
      initData() {
        this.subNavIndex = 0;
        this.switchIndex = 1;
        this.getTabItemWidth();      
        this.keyword = '';
        this.dataList = [];
        if(this.gameMenus?.length > 0) {
          this.vendorId = this.gameMenus[0].ids;          
          this.getVendorGame();
        } else {
          this.over = true;
        }
      },
      changeSwitchIndex(index) {
        this.switchIndex = index; 
        this.dataList = [];
        this.keyword = '';
        if(this.switchIndex == 1)
          this.getVendorGame();
        else
          this.getGameByIds();
      },
      changeSubNavIndex(index, item) {
        this.subNavIndex = index;
        this.getTabItemWidth();
        this.dataList = [];
        this.keyword = '';
        this.vendorId = item.ids;
        if (this.switchIndex == 1) {
          this.getVendorGame();
        } else {
          this.getGameByIds();
        }
      },
      getTabItemWidth() {
        let query = uni
            .createSelectorQuery()
            // #ifndef MP-ALIPAY
            .in(this)
          // #endif
        // 获取容器的宽度
        query
          .select(`#scrollContainer`)
          .boundingClientRect((data) => {
            if (!this.containerWidth && data) {
              this.containerWidth = data.width
            }
          })
          .exec()
        this.subNavItemWidth = this.containerWidth / 3;
        // 获取所有的 tab-item 的宽度
        query
          .selectAll('.con')
          .boundingClientRect((data) => {
            if (!data) {
              return
            }
            let lineLeft = 0
            let currentWidth = 0
            let totalWidth = 0
            if (data && data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                totalWidth += data[i].width;
                if (i < this.subNavIndex) {
                  lineLeft += data[i].width
                } else if (i == this.subNavIndex) {
                  currentWidth = data[i].width
                } 
              }
              // 当前滑块的宽度
              this.currentWidth = currentWidth
              // // 缩放后的滑块宽度
              // this.lineWidth = currentWidth * this.lineScale * 1
              // // 滑块作移动的位置
              // this.lineLeft = lineLeft + currentWidth / 2
              // // 胶囊距离左侧的位置
              // this.pillsLeft = lineLeft
              // 计算滚动的距离左侧的位置
              const center = this.containerWidth / 2 - currentWidth / 2;          
              if(lineLeft < center)
                this.scrollLeft = 0;
              else if(lineLeft > totalWidth - center )
                this.scrollLeft = totalWidth;
              else
                this.scrollLeft = lineLeft - center;
              // this.scrollLeft = lineLeft + currentWidth / 2 - this.containerWidth / 2
              }
            
          })
          .exec()
      },
      searchGame() {        
        if (this.switchIndex == 1) {
          this.getVendorGame();
        } else {
          this.getGameByIds();
        }
      },
      getVendorGame() {
        let self = this;
        let req = [self.pageNo, self.pageSize, self.vendorId, self.switchIndex, self.keyword];
        self.$api.getVendorGame(
          ...req,
          function (err, res) {
            if (err) {
              uni.showToast({
                title: err.msg,
                icon: "none",
              });
            } else {
              self.dataList.push(...res.list);
              if (self.pageNo >= res.pages) {
                self.over = true;
              }
            }
          },
          true
        );
      },
      getGameByIds() {
        let self = this;
        let req = [self.pageNo, self.pageSize, self.vendorId, self.switchIndex, self.keyword];
        self.$api.getGameByIds(
          ...req,
          function (err, res) {
            if (err) {
            } else {
              self.dataList.push(...res.list);
              if (self.pageNo >= res.pages) {
                self.over = true;
              }
            }
          },
          true
        );
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  ::v-deep  .nav .uni-scroll-view-content{
    display: flex;
  }
    .multiGameList {
      position: relative;
      // padding-left: 25%;
      // max-height: 784upx;
      overflow-y: auto;
      .game-type {
        .switch {
          width: 100%;
          padding: .75rem 0.625rem;
          .game-type-switch {
            display: flex;
            width: 100%;
            color: white;
            font-size: .8125rem;
            border: 0.0625rem solid #db9c30;
            border-radius: 0.25rem;
            .active {
              background: #dc9c30;
            }        
            .all-games {
              text-align: center;
              font-size: 100%;
              height: 1.875rem;
              flex: 1;
              line-height: 1.875rem;
            }
            .hot-games {
              text-align: center;
              font-size: 100%;          
              height: 1.875rem;
              flex: 1;
              line-height: 1.875rem;
            }
          }
        }
        .nav {
          z-index: 1;
          color: #9ea9b3;
          overflow-x: auto;
          background-color: #0f0f0f;
          position: relative;
          // height: 92upx;
          // margin-bottom: 16upx;
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
        .game-search{
          position: relative;
          height: 100rpx;
          padding: 20rpx 30rpx;
          color: white;
          box-sizing: border-box;
          display: flex;
          align-items: center;          
          &__input{
            height: 2rem;
            background: #000;
            padding-left: 0.625rem;
            border-radius: 0.1875rem;
            font-size: 1rem;
            width: 100%;
            border: 0.0625rem solid rgba(255,172,48,.5);
            flex: 0 0 85%;
            margin-right: 1.25rem;
          }
          &__empty{
            color:#999
          }
          ::v-deep .uni-input-wrapper {
            padding-left: 0;
          }
          .game-search_s {
            width: 36rpx;
            height: 36rpx;
            flex: 0 0 10%;
          }
          
        }

        .nav {
          z-index: 1;
          color: #9ea9b3;
          overflow-x: auto;
          background: #2b3043;
          border-top: 0.0625rem solid rgba(0,0,0,.5);
          border-bottom: 0.0625rem solid rgba(0,0,0,.5);
          position: relative;
          height: 2.75rem;
          // height: 92upx;
          // margin-bottom: 16upx;
          padding: 0;
          white-space: nowrap;
          line-height: 60rpx;
          

          .con {            
            display: inline-flex;
            vertical-align: middle;
            /* height: 41px; */
            line-height: 1.2rem;
            padding: 0 14px;
            color: #fff;
            background: #171717;
            font-size: .8125rem;
            font-weight: 500;
            border-radius: 0px;      
            flex-direction: row;
            align-items: center;
            flex:1 0 auto;
            flex-basis: 34%!important;
            max-width: 34%;

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
              line-height: 2.375rem;
              font-weight: 500;
              font-size: .75rem;
            }
          }

          .con:nth-child(1) {
            margin-top: 0;
          }

          .con-active {
            // background: linear-gradient(85.62deg,#fead00 10.63%,#ffc54a 102.31%);
            
            color: #fff;
            background: #000;
            border-bottom: 0.1875rem solid #ff9000;

          }
        }
      }
      .games {
        display: flex;
        flex-wrap: wrap;
        .game {
          position: relative;
          width: 25%;
          min-height: 8.125rem;
          padding: 0 0.625rem 1.25rem;
          // background: url("../../static/image/indexImg/game-bg.png") no-repeat center/contain;
          .inner {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .game-image {
              padding: .3125rem;              
              display: flex;
              &::before {
                position: absolute;
                width: 4.375rem;
                height: 0.9375rem;
                background-image: -webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,.1)),to(hsla(0,0%,100%,0)));
                border-radius: 0.3125rem;
                top: 0.0625rem;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                content: "";
              }
              .img {
                width: 4.0615rem;
                height: 4.0615rem;
                border-radius: 50%;
              }
            }
            
    
            .title {
              font-size: .8125rem;
              display: -webkit-box;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: .6875rem;
              padding-top: 0.5rem;
              word-break: break-word;
            }
          }
        }
      }
      
      .search-none {
        width: 100%;
        color: #58576E;
        font-size: 24upx;
        text-align: center;
        margin-top: 50upx;
        .wen-none {
          color: #8A8989;
          font-size: 28upx;
        }
      }
    }
  </style>
  