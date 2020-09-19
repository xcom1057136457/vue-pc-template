<template>
  <div>
    <div class="topWrapper">
      <UserCard></UserCard>
    </div>
    <div class="echartsWrapper mt_20 px_10">
      <Echarts></Echarts>
    </div>
  </div>
</template>

<script>
import { fetchList } from "../../api/article";
import UserCard from "./components/userCard";
import Echarts from "./components/echarts";
import Vue from "vue";
export default {
  data() {
    return {};
  },
  components: {
    UserCard,
    Echarts,
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.echartsWrapper {
  height: 350px;
}
</style>
