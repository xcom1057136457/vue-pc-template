<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="false"
    :unique-opened="true"
    background-color="#3d454d"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="changePageHandler"
    style="border-right: none"
  >
    <el-submenu :index="item.id" v-for="item in navItem" :key="item.id">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.navName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="itemData.path"
          v-for="(itemData,index) in item.children"
          :key="index"
          v-show="itemData.show"
        >
          <i :class="itemData.icon"></i>
          {{ itemData.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import navData from "../../../assets/json/nav.json";
export default {
  data() {
    return {
      collapse: false,
      navItem: navData,
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isCollapse: {
      handler(val) {
        this.collapse = val;
      },
      deep: true,
    },
  },
  methods: {
    changePageHandler(val) {
      this.$router.push({
        path: val,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}

::v-deep .el-menu-item-group__title {
  display: none;
}

::v-deep .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>