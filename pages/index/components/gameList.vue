<!-- 游戏列表 -->
<template>
  <view class="gamelist">
    <!-- 左侧列表 -->
    <scroll-view class="nav" id="scrollContainer"
        :enable-flex="true"
        scroll-with-animation
        :throttle="true"
        :scroll-left="scrollLeft" scroll-x
      >
        <view
        class="con"
        :class="navIndex == index ? 'con-active' : ''"
        v-for="(item, index) in leftArray"
        :key="index"
        @click="changeIndex(index)"
      >
        <view class="bgicon">
          <image
            class="img"
            :src="getMyImg(item, navIndex,index)"
            mode="acpectFit"
            alt=""
          ></image>
        </view>
        <span>{{ item.name }}</span>
      
    </view>
      
    </scroll-view>
    <!-- GameList -->
    <view >
      <HotGameList 
        :gameList="gameList" 
        :navIndex="navIndex" 
        @difference="difference" 
        :gamemenusparent="gamemenusparent" 
        v-if="id == 0"/>
      <LiveGameList 
        :gameList="gameList" 
        :navIndex="navIndex" 
        @goGameDataClick="goGameDataClick"
        v-if="id != 0 && type == 3"/>
      <SportGameList  
        :gameList="gameList" 
        @goGameDataClick="goGameDataClick"
        :gameId="id"  v-if="id != 0 && type == 2"/>
      <MultiGameList  
        :gameId="id" 
        :navIndex="navIndex"  
        :gamemenusparent="gamemenusparent"
        :gameMenus="gamemenus"
        @difference="difference" 
        @goGameDataClick="goGameDataClick"
        v-if="id != 0 && type == 1"/>
    </view>
  </view>
</template>

<script>
import HotGameList from '../../gameList/hotGameList.vue';
import LiveGameList from '../../gameList/liveGameList.vue';
import SportGameList from '../../gameList/sportGameList.vue';
import MultiGameList from '../../gameList/multiGameList.vue';
export default {
  components: {
    HotGameList,
    LiveGameList,
    SportGameList,
    MultiGameList
  },
  props: {
    arr: Array,
    leftArray: Array,
    gamemenus: Array,
    leftMenuIcon: Array,
    gameHot: Array,
    gamemenusparent: [Object, Array],
  },
  data() {
    return {
      navTop: 0, // 滚动的高度
      navIndex: 0, //左侧列表索引
      scrollLeft: 0,
      containerWidth: 0,
      clientRectWidth: 0,
      noDate: require("@/static/image/gameerror.png"),
	  id: 1,
    type: 1,
	  gameList:[]
    };
  },
  created(){
	  this.gameList = this.leftArray[this.navIndex]?.children
	  this.id = this.leftArray[this.navIndex]?.id
    this.type = this.leftArray[this.navIndex]?.type
  },
  onShow() {
  },
  mounted() {    
			this.$nextTick(() => {
				this.getTabItemWidth()
			})
  },
  methods: {
    // 更改左侧列表选中
    changeRightData(leftArray) {
      setTimeout(() => {
		this.gameList = leftArray[this.navIndex]?.children;
		this.id = leftArray[this.navIndex]?.id;
    this.type = leftArray[this.navIndex]?.type;
        this.$emit("changeRightData", leftArray[this.navIndex]);
      }, 0);
    },
    changeIndex(val) {
      this.navIndex = val;
      this.gameList = this.leftArray[val]?.children
      this.id = this.leftArray[val].id
      this.type = this.leftArray[val].type
      this.$emit("changeRightData", this.leftArray[this.navIndex]);
      this.getTabItemWidth();
    },
    getMyImg(item, navIndex,index) {
		if(navIndex===index){
      if(item.id == 0) {
			  return item.menuIconActiveApp
      }
			return this.$config.getImgUrl(item.menuIconActiveApp)
		} else {
      if(item.id == 0) {
			  return item.menuIconApp
      }
			return this.$config.getImgUrl(item.menuIconApp)
    }
    // else {
		// 	return this.$config.getImgUrl(item.menuIconApp)
		// }
      // if (!this.leftMenuIcon[index]) return "";
      // return this.leftMenuIcon[index][index == navIndex ? "imgs" : "img"];
    },
    difference(gamemenusparent, item, navIndex, index) {
      this.$emit("difference", {
        gamemenusparent,
        item,
        navIndex,
        index,
      });
    },
    goGameDataClick(item) {
      this.$emit('goGameDataClick', {
        item
      })
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
              if (i < this.navIndex) {
                lineLeft += data[i].width
              } else if (i == this.navIndex) {
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
    }
  },
};
</script>

<style lang="less" scoped>
::v-deep  .secondList .uni-scroll-view-content{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20upx 24upx;
    align-content: flex-start;
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
    // margin-bottom: 16upx;
    padding: 5upx 6upx;
    background-color: #3a3a3a;
    white-space: nowrap;
    line-height: 60rpx;
    

    .con {
      display: inline-flex;
      vertical-align: middle;
      /* height: 41px; */
      line-height: 33upx;
      padding: 0 14px;
      color: #fff;
      font-size: 22upx;
      width: min-content;
      font-weight: 500;
      border-radius: 30px;      
      flex-direction: column;
      align-items: center;
      .bgicon {
        width: 60upx;
        height: 60upx;
        margin-top: 6upx;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        margin-top: 2upx;
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
  
}
</style>
