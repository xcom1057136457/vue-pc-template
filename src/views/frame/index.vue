<template>
  <div class="index">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '240px'">
        <left-nav :isCollapse="isCollapse"></left-nav>
      </el-aside>
      <el-container>
        <el-header>
          <base-bar></base-bar>
          <nav-tab></nav-tab>
        </el-header>
        <el-main>
          <el-backtop target=".el-card"></el-backtop>
          <el-card>
            <transition name="slide-fade">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive" />
              </keep-alive>
            </transition>
            <transition name="slide-fade">
              <router-view v-if="!$route.meta.keepAlive" />
            </transition>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LeftNav from "./components/leftNav";
import navTab from "./components/tabNav";
import baseBar from "./components/baseBar";
import { getToken } from "../../utils/auth";
import { getInfo } from "../../api/user";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.frame.isCollapse,
    }),
  },
  watch: {},
  components: {
    "left-nav": LeftNav,
    "nav-tab": navTab,
    "base-bar": baseBar,
  },
  methods: {
    ...mapActions(["GET_USERINFO"]),
    /**
     * 获取个人数据
     */
    async getUserInfo() {
      let token = JSON.parse(getToken());
      let { code, data } = await getInfo(token.token);
      if (code == 200) {
        this.GET_USERINFO(data);
      }
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../../styles.scss";
.index {
  height: 100%;
  > .el-container {
    height: 100%;
    overflow: hidden;
    > .el-aside {
      overflow: hidden;
      transition-property: all;
      transition-duration: 0.3s;
      background-color: #3d454d;
    }
    > .el-container {
      > .el-header {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: unset !important;
      }
      > .el-main {
        background-color: #f9f9f9;
        padding: 10px;
        height: 100%;
        overflow: hidden;
        > .el-card {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          ::v-deep .el-card__body {
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
