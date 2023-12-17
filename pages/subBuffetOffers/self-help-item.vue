<!-- 自助列表 -->
<template>
  <view class="card" @tap.top="handleDetail(cardObj)">
    <!-- 图标和标题 -->
    <view class="card-header">
      <view class="card-box-img">
        <image
          class="card-img"
          :src="require(`./image/${cardObj.icon}.png`)"
        ></image>
      </view>
      <view class="card-content">
        <text class="card-title">{{ cardObj.title }}</text>
        <view class="card-subtitle">{{ cardObj.subTitle }}</view>
      </view>
    </view>
    <!-- 文本 -->
    <view class="card-text">{{$t('自助申领')}}</view>
  </view>
</template>

<script>
import childStore from "./utils/store.js";
export default {
  props: {
    cardObj: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      login: false,
    };
  },
  methods: {
    handleDetail(items) {
      console.log(this.$config.theme);
      this.login = this.$api.isLogin();
      if (items.type === 7) {
        if (items.needLogin && !this.login) {
          uni.navigateTo({
            url: "/pages/Login/Login",
          });
        }
        items.url &&
          uni.navigateTo({
            url: items.url,
          });
        return;
      }
      if (this.login) {
        if (items.type === 3) {
          this.$cache.set("activityId", items.id);
          // #ifdef H5
          items.actFolder = items.thematicActivitiesFolder;
          // #endif
          // #ifdef APP-PLUS
          items.actUrl = items.thematicActivitiesUrl;
          // #endif
          console.log(items);
          this.$cache.set("activityItem", items);
          if (this.$config.theme == "a023" || this.$config.theme == "a024") {
            uni.navigateTo({
              url: "/pages/thematic/thematic",
            });
          } else {
            uni.navigateTo({
              url: "/pages/activity/activity",
            });
          }
        } else if (items.type === 2) {
          //51签到活动
          uni.navigateTo({
            url: "/pages/subBuffetOffers/weekCheckIn?id=" + items.id,
          });
        } else {
          childStore.commit("setSelfHelpItem", { ...items, index: this.index });
          uni.navigateTo({
            url:
              "/pages/subBuffetOffers/details?id=" +
              items.id +
              "&index=" +
              this.index,
          });
        }
      } else {
        uni.showModal({
          title: this.$t("温馨提示"),
          content: this.$t("您还未登录，请先登录"),
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: "/pages/Login/Login",
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 48%;
  background-color: #fff;
  padding: 0 22upx;
  margin-bottom: 22upx;
  box-sizing: border-box;
  border-radius: 16upx;
  // display: flex;
}
.card-header {
  display: flex;
  align-items: center;
  height: 140upx;
  margin-bottom: 10upx;
  // border-bottom: 2upx solid #f7f7f7;
}
.card-box-img {
  width: 112upx;
  height: 112upx;
  margin: 20upx 10upx 0 0;
  // vertical-align: middle;
}
.card-img {
  width: 112upx;
  height: 112upx;
  background-size: 100% 100%;
  vertical-align: middle;
}
.card-title {
  color: #333;
  font-size: 28upx;
  font-weight: 500;
  width: 160upx;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.card-subtitle {
  color: #999;
  font-size: 24upx;
  margin-top: 4upx;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160upx;
  height: 60upx;
}
.card-content {
  display: flex;
  flex-direction: column;
}
.card-text {
  width: 100%;
  text-align: center;
  height: 80upx;
  line-height: 80upx;
  color: #999;
  font-size: 26upx;
  border-top: 2upx solid #f7f7f7;
}
uni-view {
  line-height: 1.4;
}
</style>
