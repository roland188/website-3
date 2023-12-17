<!-- 亿元回馈 -->
<template>
	<view class="give-container">
		<Marquee :text="selfHelpItem.marquee" />
		<view class="give-none" v-if="giveBackList.length===0">-{{$t('暂无记录')}}-</view>
		<view class="give-content" v-if="giveBackList.length>0">
			<view class="give-items" v-for="(items,i) in giveBackList" :key="i" >
				<!-- 开始和结束时间 -->
				<view class="give-time" @tap="handleTapGive(items)">
					<view class="give-start give-box">
						<text class="coloraa">
							{{$t('开始时间')}}
						</text>
						<view class="color32">
							{{items.checkTimeStart}}
						</view>
						<view class="lucky-radio" :class="{'active-img': flag}"></view>
					</view>
					<view class="give-start">
						<text class="coloraa">{{$t('结束时间')}}</text>
						<view class="color32">
							{{items.checkTimeStop}}
						</view>
					</view>
				</view>
				<!-- 出款流水、盈亏总额、奖励金额 -->
				<view class="give-row">
					<view class="give-col">
						<text class="coloraa">{{$t('流水倍数')}}</text>
						<view class="color32">
							{{items.audit}}
							<text>{{$t('倍')}}</text>
						</view>
					</view>
					<view class="give-col">
						<text class="coloraa">{{$t('盈亏总额')}}</text>
						<view class="color32">
							{{items.amountRwLoss}}
						</view>
					</view>
					<view class="give-col">
						<text class="coloraa">{{$t('奖励金额')}}</text>
						<view class="color32">
							{{items.amountReward}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="tip">{{$t('温馨提示')}}</view>
			<view class="text">
				{{ $t('1.活动对象：所有普通VIP及以上的会员。') }}
				{{ $t('2.所获礼金1倍流水出款。') }}
				{{ $t('3.领取时间：每月1日，11日，21日，即可领取。') }}
				{{ $t('4.此活动可以所有优惠同时共享。') }}
				{{ $t('5.所有客户只能拥有一个账号：同一个IP，同一个存/提款卡，同一个手机号码，同一个邮箱都承认同一个客户，如果发现同一个拥有两个或以上的账户，重复的账户将会被冻结，保留索回重复账户的奖励及盈利的权利。') }}
				{{ $t('6.参与该优惠，即表示您同意《优惠规则与条款》') }}
			</view>
		</view>
		<view class="btn-box"  @tap="handleTapBtn" v-if="status===0">
			<view class="btn" :class="{'active':status === 0 && flag}">{{statusTextList[status]}}</view>
		</view>
	</view>
</template>

<script>
	import childStore from '../../utils/store.js'
	import Marquee from '../marquee/index.vue'
	import {
		moment
	} from '../../utils/moment.js'
	export default {
		components: { Marquee },
		data() {
			return {
				getIdList:[],
				recordsNumberList:[],
				statusTextList: [this.$t('领取奖励'),this.$t('已领取'),this.$t('领取')],
				recordsNumber: '',
				flag: false,
				received:false,
				status:3 //可以领取
			};
		},
		mounted() {
			this.getIdList = []
		},
		computed:{
			selfHelpItem(){
				return  childStore.state.selfHelpItem || {}
				
			},
			giveBackList(){ 
				let list = []
				try{
					let receivedList = this.selfHelpItem.compensationVO ? this.selfHelpItem.compensationVO.receivedList : []
					let items = receivedList[0]
					items.checkTimeStart = items.checkTimeStart ? moment(new Date(items.checkTimeStart)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD')
					items.checkTimeStop = items.checkTimeStop ? moment(new Date(items.checkTimeStop)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD')
					this.status = items.status
					list.push(items)
				}catch(e){
					//TODO handle the exception
				}
				return list
			}
		},
		methods:{
			// 领取礼金
			handleTapBtn(){
				if(this.status !==0 && this.flag) return false
				let recordsNumber = encodeURIComponent(this.recordsNumber)
				this.$api.putReceive(this.selfHelpItem.id,recordsNumber,(err,res)=>{
					if(res){
						uni.showToast({
							icon:'none',
							title:this.$t('领取成功')
						})
						this.status = 3
						// uni.$emit('handleUpdata',11)
						this._getThematicActivitiesByApp(this.selfHelpItem.id)
					}
				},false)
			},
			// 数据处理所有
			_getThematicActivitiesByApp(id){
				this.$api.getThematicActivitiesByApp(id,(err,res)=>{
					if(err) return 
					if(res){
						childStore.commit('setSelfHelpItem',res)
						// this.setSelfHelpItem(res)
					}
				})
			},
			// 点击激活
			handleTapGive(items){
				// 判断有相同的值不加入数组
				this.flag = !this.flag
				this.status = items.status
				this.recordsNumber = items.recordsNumber
				// 判断有相同的值不加入数组
				// if(this.getIdList.includes(items.id)) return false
				// this.getIdList.push(items.id)
				// this.recordsNumberList.push(items.recordsNumber)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.give-container{
		background: #f7f7f7;
		padding: 32upx;
	}
	.give-none{
		color: #999;
		text-align: center;
		margin: 32upx;
		font-size: 28upx;
	}
	.content{
		margin-top: 34upx
	}
	.tip{
		color: #e91919;
		font-size: 28upx;
	}
	.text{
		color: #999;
		font-size: 26upx;
		white-space: pre-line;
		line-height: 2;
		margin-top: 22upx;
		margin-bottom: 110upx;
	}
	.btn-box{
		position: absolute;
		bottom: 0upx;
		left: 0;
		height: 120upx;
		width: 100%;
		background-color: var(--themef7);
		z-index: 1;
	}
	.btn{
		color: #999;
		background: #d2d2d2;
		box-shadow: 0 3px 6px #d2d2d2;
		border-radius: 8upx;
		text-align: center;
		// line-height: 3;
		// position: fixed;
		// bottom: 20upx;
		width: 80%;
		height: 80upx;
		line-height: 80upx;
		// left: 10%;
		font-size: 28upx;
		margin: 0 auto;
		&.active{
			background-color: var(--themeBtnBg);
			color: #fff;
		}
	}
	.give-content{
	
	}
	.give-items{
		// margin: 20upx;
		padding: 0 30upx 50upx 30upx;
		background-color: #fff;
		font-size: 22upx;
		border-radius: 16upx;
		margin-bottom: 20upx;
	}
	.give-time{
		display: flex;
		justify-content: space-around;
		height: 110upx;
		align-items: center;
		border-bottom: 1upx solid #f2f2f2;
	}
	.give-start{
		wdith: 50%;
		text-align: center;
	}
	.give-row{
		display: flex;
		justify-content: space-between;
		height: 130upx;
		width: 100%;
		align-items: center;
		border-bottom:  1upx solid #f2f2f2;
		// margin-bottom: 50upx;
	}
	.give-col{
		text-align: center;
	}
	.give-box{
		position: relative;
	}
	.lucky-radio{
		width: 32upx;
		height: 32upx;
		background-color: #F2F2F2;
		border: 2upx solid #efeded;
		border-radius: 100%;
		vertical-align: bottom;
		margin-right: 20upx;
		margin-top: 4upx;
		position: absolute;
		top: -4upx;
		left: -80upx;
		&.active-img{
			background: url(../../image/lucky-right.png) no-repeat;
			background-size: 100% 100%;
			border: none;
		}
	}
</style>
