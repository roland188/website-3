<!-- 客服页面  by 琦琦-->
<template>
  <view class="aboutUs">
    <!-- 老客服才显示头部导航 -->
    <uni-nav-bar
      :title="$t('关于我们')"
      :status-bar="true"
      left-icon="back"
      @clickLeft="goBack"
      :fixed="true"
      background-color="#22211f"
      color="#fff"
      :shadow="false"
    ></uni-nav-bar>
    <view class="customerUl" v-if="ServiceStatus !== 1">
      <view v-if="appMerge" class="customeList">
        <view class="customeLeft">
          <image
            class="customeImg"
            :src="'../../static/image/imgUrl1.png'"
            mode="widthFix"
          ></image>
          <view class="customeCon">
            <view class="customName"> {{ $t('在线客服') }} </view>
            <view class="customeNumber"> </view>
          </view>
        </view>
        <view class="customeRight">
          <view @click="goCustomer(appMergeUrl)" class="customeBtn">
            {{ $t('联系客服') }}
          </view>
        </view>
      </view>
      <view
        class="customeList"
        v-for="(item, index) in customerData"
        :key="index"
      >
        <view class="customeLeft">
          <image
            class="customeImg"
            :src="'../../static/image/imgUrl' + item.typeId + '.png'"
            mode="widthFix"
          ></image>
          <view class="customeCon">
            <view class="customName">
              {{ item.name }}
            </view>
            <view class="customeNumber">
              {{ item.number }}
            </view>
          </view>
        </view>
        <view class="customeRight">
          <view
            @click="goCustomer(item.url, item.name)"
            v-if="item.url"
            class="customeBtn"
          >
            {{ $t('在线客服') }}
          </view>
          <view v-else class="customeBtn" @click="copy(item.number)">
            {{ $t('复制账号') }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#D6AE66",
        },
      },
      customerServiceUrl: "",
      customerData: [],
      appMerge: false,
      appMergeUrl: "",
      ServiceStatus: 0,
    };
  },
  created() {
    
    // #endif
  },
  onShow() {
    
  },
  onReady() {
    
  },
  onNavigationBarButtonTap() {
    //自定义返回按钮,返回首页
    // uni.switchTab({
    // 	url: '../index/index'
    // })
    uni.navigateBacks();
  },
  methods: {
    
  },
};
</script>

<style scoped>
.aboutUs {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    overflow-y: auto;
}

.customerUl {
    overflow-y: auto;
    padding: 20upx;
}

.customeList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30upx 30upx;
    background-color: #fff;
    border-radius: 12upx;
    margin-bottom: 20upx;
    font-size: 28upx;
}

.customeLeft {
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.customeRight {
    flex-grow: 0;
    flex-shrink: 0;
}

.customeImg {
    width: 100upx;
    margin-right: 20upx;
    height: auto;
}

.customName {
    font-size: 30upx;
}

.customeNumber {
    font-size: 24upx;
    margin-top: 10upx;
    color: #666;
}

.customeBtn {
    width: 200upx;
    height: 76upx;
    padding: 10upx 20upx;
    font-size: 24upx;
    line-height: 28upx;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 64upx;
    background: var(--loginNewBtn);
    color: #fff;
}
</style>
