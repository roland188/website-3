<!-- 棋牌救援 -->
<template>
	<view class="chess">
		<Marquee :text="selfHelpItem.marquee" />
		<!-- 	<view class="gift-tip">
			发放时间：首次存款日期开始，每满一整年满足要求后开始发放,请及时查看！
		</view> -->
		<!-- 棋牌救援卡片 -->
		<!-- <weekly-reward-tag :timeText="timeText" type="2" :isTagContent="false" :showCotentTag="false" :weeklyList="list"> -->
		<weekly-reward-tag :timeText="timeText" type="2" :isTagContent="false" :showCotentTag="false" :weeklyList="list">
		<!-- 	<view class="down" slot="down">
				<view v-if="daoTime && !timeText" class="count-down">
					<uni-countdown :start="daoTime.istart" :showColon="false" :day="daoTime.day" :hour="daoTime.hour"
						:minute="daoTime.minute" :second="daoTime.second"></uni-countdown>
					<text>领取</text>
				</view>
			</view> -->
		</weekly-reward-tag>
		<!-- 按钮 -->
		<view class="card-btn" :class="{'active':status===0 && isPass}" @tap="handleTap(status)">{{btnText}}</view>
	</view>
</template>

<script>
	import childStore from '../../utils/store.js'
	import Marquee from '../marquee/index.vue'
	import {
		moment
	} from '../../utils/moment.js'
	import weeklyRewardTag from '../weekly-reward/weekly-reward-tag.vue'
	import uniCountdown from '../uni-countdown/uni-countdown.vue'
	export default {
		components: {
			weeklyRewardTag,
			uniCountdown,
			Marquee
		},
		data() {
			return {
				timeText: this.$t('00天00时00分00秒'),
				btnText: this.$t('未达到领取条件'),
				weeklyList: [{
						text: this.$t('日期'),
						totalMoney: moment(new Date()).before(1).format('MM月DD日'),
						props: 'checkTimeStop'
					},
					{
						text: this.$t('负盈利'),
						totalMoney: '0.00',
						props: 'amountLoss'
					},
					{
						text: this.$t('奖励金(元)'),
						totalMoney: '0.00',
						props: 'amountReward'
					},
				],
				weeklyLists: [{
						text: this.$t('日期'),
						totalMoney: moment(new Date()).before(1).format('MM月DD日'),
						props: 'checkTimeStop'
					},
					{
						text: this.$t('负盈利'),
						totalMoney: '0.00',
						props: 'amountLoss'
					},
					{
						text: this.$t('奖励金(元)'),
						totalMoney: '0.00',
						props: 'amountReward'
					},
				],
				daoTime: {
					istart: false
				},
				betNo: '',
				rewardItems: {}, // 存储数据
				status: 1,
				isStartTime: '',
				isEndTime: '',
				compensationVO: {}
			};
		},
		computed: {
			getThatDay(){
				// 测试要求时间改为写死 领取时间：x年x月x日  03：00：00~12：59：59
				// let date = new Date();
				// return date .toLocaleDateString() + '  '+'03:00:00~12:59:59';
				let nowDate = new Date();
				let year = nowDate.getFullYear(); 
				let month = nowDate.getMonth()+1;//月份是从0开始的，所以需要加1
				let day = nowDate.getDate();
				return year + this.$t("年") + month + this.$t("月") + day + this.$t("日") + '  '+'03:00:00~12:59:59';
			},
			selfHelpItem(){
				return  childStore.state.selfHelpItem || {}
				
			},
			isPass() {
				const now = new Date().getTime()
				try {
					return now >= this.compensationVO.validTimeStartApp && now <= this.compensationVO.validTimeStopApp
				} catch (e) {
					//TODO handle the exception
				}
				return false
			},
			list() {
				try {
					// this.isStartTime = this.$moment(new Date()).format('YYYY-MM-DD 00:00:00')
					// this.isEndTime = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
					let compensationVO = this.selfHelpItem && this.selfHelpItem.compensationVO
					this.compensationVO = this.selfHelpItem.compensationVO
					if (compensationVO) {
						// 隔天有效2  1长期有效
						if (compensationVO.validType === 2) {
							this.daoTime.istart = false
							// this.tagContent.titleLeft = this.$moment(new Date(compensationVO.validTimeStopApp)).format('MM月DD日')
							this.timeText = moment(new Date(compensationVO.validTimeStartApp)).format(
									'YYYY年MM月DD日  hh:mm') + '-' + moment(new Date(compensationVO.validTimeStopApp))
								.format('YYYY年MM月DD日 hh:mm')
							// this.timeText = this.$moment(new Date()).before(1).format('MM月DD日') + compensationVO.validTimeStart + '-' + compensationVO.validTimeStop
						} else if (compensationVO.validType === 1) {
							this.getCounDownTime(compensationVO.validTimeStopApp)
							this.timeText = ''
						} else {
							this.daoTime.istart = false
							this.timeText = this.timeText
						}
						// 当列表有值时处理列表数据
						if (compensationVO && compensationVO.receivedList.length > 0) {
							this.betNo = compensationVO.receivedList[0].recordsNumber;
							let obj = compensationVO.receivedList[0]
							this.status = compensationVO.receivedList[0].status
							let titleLeft = obj.checkTimeStop ? moment(new Date(obj.checkTimeStop)).format('MM月DD日') :
								moment(new Date()).before(1).format('MM月DD日')
							// status 0领取   status 1 已领取  未达到领取状态
							let text = obj.status === 1 ? this.$t('已领取') : this.$t('未达到领取条件')
							this.btnText = obj.status === 0 ? this.$t('领取') : text
							this.weeklyList.forEach((items, i) => {
								if (obj.hasOwnProperty(items.props)) {
									items.totalMoney = items.props === 'checkTimeStop' ? titleLeft : obj[items
										.props]
								}
							})

						} else {
							this.btnText = this.$t('未达到领取条件')
							this.status = 1
							// console.log(this.compensationVO.validTimeStartApp,"this.compensationVO.validTimeStartApp",this.weeklyList)
							this.weeklyList[0].totalMoney = moment(this.compensationVO.validTimeStartApp).before(1).format(
								'MM月DD日')
							this.weeklyList = this.weeklyLists
						}
					}
					return this.weeklyList
				} catch (e) {
					//TODO handle the exception

				}
				return this.weeklyLists

			},

		},
		mounted() {
		},
		methods: {
			// 领取按钮
			handleTap(status) {
				if (status !== 0) return false
				let betNo = encodeURIComponent(this.betNo)
				this.$api.putReceive(this.selfHelpItem.id, betNo, (err, res) => {
					if (err) return false
					if (res) {
						uni.showToast({
							icon: 'success',
							title: this.$t('领取成功')
						})
						// 棋牌救援
						// uni.$emit('handleUpdata',9)
						this._getThematicActivitiesByApp(this.selfHelpItem.id)
					}
				}, false)
			},
			_getThematicActivitiesByApp(id) {
				this.$api.getThematicActivitiesByApp(id, (err, res) => {
					if (err) return
					if (res) {
						childStore.commit('setSelfHelpItem', res)
						// this.setSelfHelpItem(res)
					}
				})
			},
			// 计算倒计时间
			getCounDownTime(mss) {
				let day = parseInt(mss / (1000 * 60 * 60 * 24))
				let hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				let minute = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
				let second = parseInt((mss % (1000 * 60)) / 1000)
				this.daoTime = {
					day,
					hour,
					minute,
					second,
					mss: mss,
					istart: true
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chess {
		padding: 20upx 30upx;
	}

	.gift-tip {
		font-size: 24upx;
		font-weight: 500;
		color: var(--themeBtnBg);
		margin-bottom: 22upx;
	}

	.weekly-reward-container {
		padding: 0 24upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16upx;
	}

	.card-btn {
		background: #d2d2d2;
		box-shadow: 0 6upx 12upx #e6e4e4;
		border-radius: 8upx;
		color: #999;
		margin: 80upx 0;
		text-align: center;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;

		&.active {
			background-color: var(--themeBtnBg);
			color: #fff;
		}
	}

	.count-down {
		display: flex;
		height: 68upx;
		align-items: center;
	}
</style>
