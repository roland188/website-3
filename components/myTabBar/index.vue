<template>
    <view class="tabBar">        
        <view class="tabBar-active">            
            <view class="selected-tabBar-mark" v-for="(item, index) in tabList" :key="index">
                <image src='../../static/image/tabbar/selectedTab.png' v-show="tabIndex == index" mode="widthFix"/>
            </view>
        </view>
        <view class="tabBar-box">
            <view class="tabBar-item" v-for="(item, index) in tabList" :key="index" @click="toIndex(item, index)">                
                <view  :class="{'rabLabel': true, 'active': tabIndex == index}">
                    <view class="transaction" v-if="dispTransaction && index == 1">
                        <view class="transaction-item" @click="goToPage('../../pages/recharge/recharge')">
                            <image class="img" src="../../static/image/tabbar/deposit.svg"/>
                            <span>{{ $t('充值') }}</span>
                        </view>
                        <view class="transaction-item" @click="goToPage('../../pages/account/account')">
                            <image class="img" src="../../static/image/tabbar/withdraw.svg"/>
                            <span>{{ $t('提现') }}</span>
                        </view>
                    </view>
                    <view class="tab-icon">
                        <image :src="tabIndex == index ? item.selectedIconPath : item.iconPath" mode="widthFix"/>
                    </view>
                    <text class="title">{{ item.text  }}</text>
                    <!--<view class="tabIcon">2</view>-->
                </view>
            </view>
        </view>
    </view>
 
</template>
 
<script>
    export default {
        props: {
            curIndex: Number,
        },
        data() {
            return {
                tabIndex: this.curIndex ?? 0,
                dispTransaction: false,
                tabList: [{
                    "pagePath": "/pages/index/index",
                    "iconPath": "../../static/image/tabbar/indexIcon.png",
                    "selectedIconPath": "../../static/image/tabbar/indexIcon_active.png",
                    "text": this.$t('首页')
                },
                {
                    "pagePath": "/pages/subCustomerService/subCustomerService",
                    "iconPath": "../../static/image/tabbar/transaction.svg",
                    "selectedIconPath": "../../static/image/tabbar/transaction.svg",
                    "text": this.$t('交易')
                },
                {
                    "pagePath": "/pages/preferential/preferential",
                    "iconPath": "../../static/image/tabbar/preferential.png",
                    "selectedIconPath": "../../static/image/tabbar/preferential_active.png",
                    "text": this.$t('优惠')
                },
                {
                    "pagePath": "/pages/subCustomerService/subCustomerService",
                    "iconPath": "../../static/image/tabbar/customerService.png",
                    "selectedIconPath": "../../static/image/tabbar/customerService_active.png",
                    "text": this.$t('在线客服')
                },
                {
                    "pagePath": "/pages/my/my",
                    "iconPath": "../../static/image/tabbar/member.png",
                    "selectedIconPath": "../../static/image/tabbar/member_active.png",
                    "text": this.$t('会员中心')
                }],
            }
        },
        onLoad() {            
            
        },
        methods:{
            toIndex(item, index){
                if(index == 1) {
                    this.dispTransaction = !this.dispTransaction;
                } else {
                    uni.switchTab({
                        url: item.pagePath,
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                }
            },
            goToPage(url) {
                console.log(url);
                uni.navigateTo({
                    url
                })
                
            }
        }
    }
</script>
 
<style scoped>
    .tabBar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 91upx;
        background: linear-gradient(180deg,#363636,#121212);
        border-top: 1upx solid #db9c30;
        position: fixed;
        width: 100%;
        z-index: 100;
        .transaction {
            position: absolute;
            bottom: 0;
            z-index: 101;
            display: flex;
            background: url('../../static/image/tabbar/transaction_back.png');
            background-position: top;
            background-size: cover;
            background-repeat: no-repeat;
            top: -121upx;
            font-size: 20upx;
            color: #aaa;
            width: 260upx;
            height: 100upx;
            padding: 0.375rem 0.625rem 0.75rem;
            .transaction-item {
                display: flex;
                flex: 0 0 50%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .img {
                    width: 30upx;
                    height: 30upx;
                }
                span {
                    font-size: 20upx;
                }
            }
        }
        .tabBar-active {
            display: flex;
            position: absolute;
            bottom: 84upx;
            width: 100%;
            .selected-tabBar-mark {
                width: 20%;
                display: flex;
            }
        }
    }

    @media screen and (min-width: 560px) {
        .tabBar {
            width: 750upx;
            max-width: 750upx;
        }
    }
 
    .tabBar-box {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .tabBar-item{
        display: flex;
       justify-content: center;
        align-items: flex-end;
        flex: 1;
        height: 100%;
        color: #aaa;
    }
    .rabLabel{
        position: relative;
        font-size: 20upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .tab-icon{
            padding: 12upx 0 0;
            width: 41upx;
        }
        .title {
            margin-top: -5px;
        }
    }
    .rabLabel.active {
        .title {
            color: #ff9000;
        }
    }
    .tabIcon{
        position: absolute;
        top:0;
        left:50%;
        transform: translate(-50%,-100%);
        width: 100rpx;
        height: 100rpx;
        border: solid 2px red;
        border-radius: 50%;
        text-align: center;
        line-height: 100rpx;
        background: #f0ad4e;
        box-sizing: border-box;
    }
</style>