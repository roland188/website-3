<template>
	<view class="self-help">
		<sub-header :title="title" @goBackHead="goBack"></sub-header>
		<view class="self-help-content" v-if="isNoData">
			<block v-for="(card, i) in cardList" :key="card.id">
				<self-help-item :cardObj="card" :index="i"></self-help-item>
			</block>
		</view>
		<view class="noData" v-else>
			--{{$t('暂无记录')}}--
		</view>
	</view>
</template>

<script>
	import subHeader from "./components/header.vue";
	import selfHelpItem from "./self-help-item.vue";
	export default {
		components: {
			subHeader,
			selfHelpItem,
		},
		data() {
			return {
				cardList: [],
				title: this.$t("自助优惠"),
				componentObj: {
					// 根据type显示子路由
					3: "specialVvent", // 专题活动
					4: "information", // 信息认证
					5: "weeklyReward", // 周勤奖励
					6: "luckyBet", // 幸运注单
					7: "anniversaryGift", // 周年礼金
					8: "chessRewards", // 棋牌奖励
					9: "chessRescue", // 棋牌救援
					10: "thousands", // 千倍百倍
					11: "giveBack", // 亿元回馈
					99999: "promo", // 洗马积分
				}
			};
		},
		onLoad() {
			this.getData();
		},
		onShow() {
			// #ifdef H5
			require("./css/theme/" + this.$config.theme + ".css");
			// #endif
		},
		computed: {
			isNoData() {
				if (this.cardList.length)
					return true
				else
					false
			}

		},
		methods: {
			// 获取数据
			getData() {
				const data = {
					pageSize: 999,
					// #ifdef APP-PLUS
					clientItem: this.$config.childCode,
					// #endif
					// #ifdef H5
					 clientItem: window.childCode,
					// #endif

				};
				this.$api.getThematicActivitiesList(
					data,
					(err, res) => {
						if (err) return;
						// let xm = {
						// 	title: '洗码积分',
						// 	name: '洗码积分',
						// 	id: 99999,
						// 	summary: '最高返水1.3%',
						// 	icon: 'icon12',
						// 	type: 99999
						// }

						if (res.content.length > 0) {
							let listFilter = res.content.filter((item) => {
								return (
									!item.name.includes(this.$t("砸蛋")) &&
									!item.name.includes(this.$t("水球")) &&
									!item.name.includes(this.$t("刮刮乐")) &&
									!item.name.includes(this.$t("盲盒"))
								);
							});
							let list = listFilter.sort((a, b) => b.sort - a.sort);
							// list.splice(2, 0, xm)
							list.forEach((e, index) => {
								e.title = e.name;
								e.subTitle = e.summary;
								e.icon = "icon" + e.type;
								e.currnetIndex = index;
								e.component = this.componentObj[e.type];
							});
							this.cardList = list;

							// console.log(this.cardList)
							uni.setStorageSync("cardList", this.cardList);
						}
					},
					true
				);
			},
			goBack() {
				uni.navigateBacks();
			},
		},
	};
</script>
<style>
	/* #ifdef APP-PLUS */
	@import url("./css/theme/a023.css");
	/* #endif */
</style>
<style lang="scss" scoped>
	.self-help {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-top: var(--status-bar-height);
		background: #fafafa;
	}

	.self-help-content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30upx;
		overflow-y: auto;
	}

	.noData {
		text-align: center;
		margin-top: 35%;
		color: #666;
	}
</style>
