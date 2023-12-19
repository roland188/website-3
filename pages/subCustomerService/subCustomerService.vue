<template>
 <view>
   <theme1 :option="option" v-if="!$config.isRxpjProject" > </theme1>
   <theme2 :option="option"  v-else > </theme2>
   <TabBar :curIndex="1"/>
 </view>
</template>

<script>
import theme1 from "./customerServiceTheme/theme1.vue";
import theme2 from "./customerServiceTheme/theme2.vue";
import TabBar from "../../components/myTabBar/index.vue";
export default {
  components: {
    theme1,
    theme2,
    TabBar
  },
  data () {
    return {
      option: {}
    }
  },
  onLoad(option) {
    this.option = option
  },
  mounted() {
  }
};
</script>

