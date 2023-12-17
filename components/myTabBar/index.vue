<template>
    <view class="tabBar">
        <view class="tabBar-box">
            <view class="tabBar-item" @click="toIndex('/pages/index/index')" >
                <view  class="rabLabel">
                    <text>商品</text>
                    <!--<view class="tabIcon">2</view>-->
                </view>
            </view>
 
            <view class="tabBar-item" @click="toIndex('/pages/show/show')" >
                <view  class="rabLabel">
                    <text>定制</text>
                    <view class="tabIcon"></view>
                </view>
            </view>
            <view class="tabBar-item" @click="toIndex('/pages/home/home')" >
                <view  class="rabLabel">
                    <text>我的</text>
                    <!--<view class="tabIcon">2</view>-->
                </view>
            </view>
        </view>
    </view>
 
</template>
 
<script>
    export default {
        methods:{
            toIndex(url){
                console.log(url);
                uni.switchTab({
                    url: url
                })
            }
        }
    }
</script>
 
<style scoped>
    .tabBar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        background: #8a6de9;
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
        background: #2C405A;
    }
    .rabLabel{
        position: relative;
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